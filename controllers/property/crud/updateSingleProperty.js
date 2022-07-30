// const Property = require("../../../models/property/Property.model");
const PropertyNew = require("../../../models/property/PropertyNew.model");
var ObjectId = require("mongoose").Types.ObjectId;

// const {
//   generateVideoPreview,
// } = require("../../../services/ffmpeg/generateVideoPreview");

const formidable = require("formidable");
// const uploadFiles = require("../../../services/upload-files");
// const {
//   generateImagePreview,
// } = require("../../../services/jimp/generateImagePreview");

const updateSingleProperty = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const form = new formidable.IncomingForm();

  form.multiples = true;
  try {
    // console.log("user123", req.body);
    form.parse(req, async (err, fields) => {
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
      // try {
      //   if (Object.keys(files).length) {
      //     const filesArray = Object.values(
      //       isArrayOfFiles(files) ? files : [files]
      //     );

      //     const allFileUploadedArray = await Promise.all(
      //       filesArray?.map(async (item) => {
      //         let location = item.path;
      //         const originalFileName = item.name;
      //         const fileType = item.type;
      //         // uploads file.

      //         const data = await uploadFiles.upload(
      //           location,
      //           originalFileName,
      //           `property/users/${user._id}/posts`
      //         );
      //         // generate video preview
      //         if (fileType.includes("video")) {
      //           const filePath =
      //             Math.random().toString().slice(3) + originalFileName;
      //           const previewLocation = await generateVideoPreview(
      //             data.Location,
      //             filePath,
      //             `property/users/${user._id}/posts`
      //           );

      //           return {
      //             url: data?.Location,
      //             type: fileType,
      //             preview: previewLocation?.Location,
      //           };
      //         }

      //         // generate image preview
      //         if (fileType.includes("image")) {
      //           const previewLocation = await generateImagePreview(
      //             data.Location,
      //             `property/users/${user._id}/posts/preview_${originalFileName}`
      //           );
      //           return {
      //             url: data.Location,
      //             type: fileType,
      //             preview: previewLocation.Location,
      //           };
      //         }
      //         return {
      //           url: data.Location,
      //           type: fileType,
      //         };
      //       })
      //     );

      //     const newProperty = PropertyNew.findOneAndUpdate(
      //       { _id: ObjectId(id) },
      //       {
      //         // media: allFileUploadedArray,
      //         user: user._id,
      //         ...fields,
      //       },
      //       { new: true }
      //     );

      //     if (allFileUploadedArray) {
      //       newProperty.media = allFileUploadedArray;
      //     }

      //     // Save newProperty to DB

      //     return res.status(200).json({
      //       success: true,
      //       data: newProperty,
      //     });
      //   } else {
      //     console.log("else is running");

      //     const newProperty = PropertyNew.findOneAndUpdate(
      //       { _id: id },
      //       {
      //         user: user._id,
      //         ...fields,
      //       },
      //       { new: true }
      //     );

      //     return res.status(200).json({
      //       success: true,
      //       data: newProperty,
      //     });
      //   }
      // } catch (error) {
      //   console.log("error in create post: ", error);
      //   next(error);
      // }
      const newProperty = await PropertyNew.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          // media: allFileUploadedArray,
          user: user._id,
          ...fields,
        },

        { new: true }
      );
      console.log("newProperty", newProperty);

      res.status(200).json({
        success: true,
        data: newProperty,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
// const isArrayOfFiles = (files) => {
//   return Array.isArray(files);
// };

module.exports = updateSingleProperty;
