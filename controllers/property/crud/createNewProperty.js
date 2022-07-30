// const Property = require("../../../models/property/Property.model");
const PropertyNew = require("../../../models/property/PropertyNew.model");
const {
  generateVideoPreview,
} = require("../../../services/ffmpeg/generateVideoPreview");

const createError = require("http-errors");
const formidable = require("formidable");
const uploadFiles = require("../../../services/upload-files");
const {
  generateImagePreview,
} = require("../../../services/jimp/generateImagePreview");

const createNewProperty = async (req, res, next) => {
  const { user } = req;

  const form = new formidable.IncomingForm();

  form.multiples = true;
  try {
    // console.log("user123", req.body);
    form.parse(req, async (err, fields, { files }) => {
      if (fields?.ammenities) {
        fields["ammenities"] = JSON.parse(fields["ammenities"]);
      }
      if (fields?.suitableFor) {
        fields["suitableFor"] = JSON.parse(fields["suitableFor"]);
      }
      if (fields?.defineproperty) {
        fields["defineproperty"] = JSON.parse(fields["defineproperty"]);
      }
      if (fields?.defineprice) {
        fields["defineprice"] = JSON.parse(fields["defineprice"]);
      }
      if (fields?.deinesizeAndStructure) {
        fields["deinesizeAndStructure"] = JSON.parse(
          fields["deinesizeAndStructure"]
        );
      }
      if (fields?.address) {
        fields["address"] = JSON.parse(fields["address"]);
      }
      if (fields?.features) {
        fields["features"] = JSON.parse(fields["features"]);
      }
      if (fields?.details) {
        fields["details"] = JSON.parse(fields["details"]);
      }
      if (fields?.definingLocation) {
        fields["definingLocation"] = JSON.parse(fields["definingLocation"]);
      }
      if (fields?.additionalRooms) {
        fields["additionalRooms"] = JSON.parse(fields["additionalRooms"]);
      }

      if (err) {
        res.status(400);
        return res.send(err);
      }
      try {
        if (Object.keys(files).length) {
          const filesArray = Object.values(
            isArrayOfFiles(files) ? files : [files]
          );

          const allFileUploadedArray = await Promise.all(
            filesArray?.map(async (item) => {
              let location = item.path;
              const originalFileName = item.name;
              const fileType = item.type;
              // uploads file.

              const data = await uploadFiles.upload(
                location,
                originalFileName,
                `property/users/${user._id}/posts`
              );
              // generate video preview
              if (fileType.includes("video")) {
                const filePath =
                  Math.random().toString().slice(3) + originalFileName;
                const previewLocation = await generateVideoPreview(
                  data.Location,
                  filePath,
                  `property/users/${user._id}/posts`
                );

                return {
                  url: data?.Location,
                  type: fileType,
                  preview: previewLocation?.Location,
                };
              }

              // generate image preview
              if (fileType.includes("image")) {
                const previewLocation = await generateImagePreview(
                  data.Location,
                  `property/users/${user._id}/posts/preview_${originalFileName}`
                );
                return {
                  url: data.Location,
                  type: fileType,
                  preview: previewLocation.Location,
                };
              }
              return {
                url: data.Location,
                type: fileType,
              };
            })
          );
          const newProperty = new PropertyNew({
            media: allFileUploadedArray,
            user: user._id,
            ...fields,
          });

          // Save newProperty to DB
          const createdProperty = await newProperty.save();
          if (!createdProperty)
            throw createError.InternalServerError(
              "Your request could not be processed. Please contact support or try again after some time."
            );

          return res.status(200).json({
            success: true,
            data: createdProperty,
          });
        } else {
          console.log("else is running");
          const newProperty = new PropertyNew({
            user: user._id,
            ...fields,
          });

          // Save newProperty to DB
          const createdProperty = await newProperty.save();
          if (!createdProperty)
            throw createError.InternalServerError(
              "Your request could not be processed. Please contact support or try again after some time."
            );

          return res.status(200).json({
            success: true,
            data: createdProperty,
          });
        }
      } catch (error) {
        console.log("error in create post: ", error);
        next(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const isArrayOfFiles = (files) => {
  return Array.isArray(files);
};

module.exports = createNewProperty;
