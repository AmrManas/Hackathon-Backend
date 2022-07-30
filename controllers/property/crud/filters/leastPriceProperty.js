const PropertyNew = require("../../../../models/property/PropertyNew.model");

const createError = require("http-errors");
const _ = require("lodash");

const convertParams = (model, params) => {
  const finalQuery = {};
  const keys = _.keys(model.schema.obj);
  const query = _.keys(params);
  const final = _.intersectionWith(query, keys);
  const options = ["_ne", "_lt", "_gt", "_lte", "_gte", "in", "_all"];
  finalQuery.find = {};
  finalQuery.where = {};
  finalQuery.sort = {};
  finalQuery.start = 0;
  finalQuery.limit = 1000;

  _.map(query, (q) => {
    _.map(options, (option) => {
      if (_.includes(q, option)) {
        var newQuery = {};
        newQuery[option.replace("_", "$")] = params[q];
        finalQuery.where[q.replace(option, "")] = newQuery;
      } else if (_.includes(q, "_sort")) {
        var actualQuery = params[q].split(":");
        finalQuery.sort[actualQuery[0]] = actualQuery[1];
      } else if (_.includes(q, "_start")) {
        finalQuery.start = (parseInt(params[q]) - 1) * parseInt(params._limit);
      } else if (_.includes(q, "_limit")) {
        finalQuery.limit = parseInt(params[q]);
      }
    });
  });
  _.map(final, (f) => {
    if (f === "name") {
      finalQuery.where[f] = { $regex: `^${params[f]}`, $options: "i" };
    } else {
      finalQuery.where[f] = params[f];
    }
  });
  _.map(query, (f) => {
    if (f === "type") {
      finalQuery.where[f] = params[f];
    }
  });
  if (params.keyword) {
    const $or = [
      { name: { $regex: `${params.keyword}`, $options: "i" } },
      { email: { $regex: `${params.keyword}`, $options: "i" } },
      { phone: { $regex: `${params.keyword}`, $options: "i" } },
      { city: { $regex: `${params.keyword}`, $options: "i" } },
      { projectName: { $regex: `${params.keyword}`, $options: "i" } },
      { price: { $regex: `${params.keyword}`, $options: "i" } },
    ];
    finalQuery.find["$or"] = $or;
  }
  return finalQuery;
};

module.exports = convertParams;

const getLeastPriceFilterProperty = async (req, res, next) => {
  try {
    const { query } = req;
    console.log(JSON.stringify(query, "query"));
    // const filters = convertParams(Property, query);
    const startIndex = (query._start && parseInt(query._start)) || 0;
    const viewSize = (query._limit && parseInt(query._limit)) || 10;
    const searchCriteria = {};
    if (query.lookingfor) {
      searchCriteria.lookingfor = query.lookingfor;
    }
    if (query.verifyStatus) {
      searchCriteria.verifyStatus = query.verifyStatus;
    }
    if (query.city) {
      searchCriteria.city = query.city;
    }
    if (query.LeastPrice) {
      searchCriteria.price = query.LeastPrice;
    }
    if (query.propertytype) {
      searchCriteria.propertytype = query.propertytype;
    }
    if (query.price) {
      searchCriteria.price = query.price;
    }

    const citiesSale = await PropertyNew.aggregate([
      {
        $match: {
          lookingfor: "Sale",
          verifyStatus: "verified",
        },
      },
      {
        $group: {
          _id: "$city",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const citiesRent = await PropertyNew.aggregate([
      {
        $match: {
          lookingfor: "Rent",
          verifyStatus: "verified",
        },
      },
      {
        $group: {
          _id: "$city",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const response = await PropertyNew.aggregate([
      { $match: searchCriteria },
      {
        $sort: {
          // created_at: -1,
          price: -1,
        },
      },
      { $skip: startIndex },
      { $limit: parseInt(viewSize) },
    ]);
    const total = await PropertyNew.countDocuments(searchCriteria);
    if (!response)
      throw createError.InternalServerError(
        "Property details can not be fetched"
      );

    res.status(200).json({
      data: response,
      total: total,
      cities: citiesSale,
      citiesRental: citiesRent,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getLeastPriceFilterProperty;
