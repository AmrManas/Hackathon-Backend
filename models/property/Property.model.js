const { Schema, model } = require("mongoose");

const PropertySchema = new Schema(
  {
    verifyStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "verified", "rejected"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    favorite: { type: Boolean, default: false },
    media: [
      {
        preview: { type: String },
        url: { type: String },
        type: { type: String },
      },
    ],

    lookingfor: { type: String },

    ExplainingProperty: { type: String },
    ExplaningPrice: { type: String },
    Defininglocation: { type: String },
    ammenities: { type: String },
    price: { type: String },
    image: { type: String },
    Date: { type: String },
    State: { type: String },
    buildingtype: { type: String },
    propertytype: { type: String },
    city: { type: String },
    pssesionStatus: { type: String },

    priceBreakup: { type: String },
    Facilities: { type: String },
    Address: { type: String },
    Flooring: { type: String },
    BrokerageResponse: { type: String },

    projectName: { type: String },
    locality: { type: String },
    areaDetails: { type: String },
    area: { type: String },
    areaType: { type: String },

    maintenance: { type: String },
    includediInPrice: { type: String },
    furnishedStatus: { type: String },
    ageOfProperty: { type: String },
    numberOfRooms: { type: String },
    numberOfBathrooms: { type: String },
    numberOfParkings: { type: String },
    viewOrFacing: { type: String },
    towerOrBlock: { type: String },
    totalFloorCount: { type: String },
    unitNo: { type: String },
    additionalRooms: { type: String },

    gymnasium: { type: String },
    swimmingPool: { type: String },
    badmintonCourt: { type: String },
    kidsPlayArea: { type: String },
    powerBackup: { type: String },
    centralAC: { type: String },
    centralWiFi: { type: String },
    attachedMarket: { type: String },
    restaurant: { type: String },
    security: { type: String },
    clubhouse: { type: String },
    balcony: { type: String },
    peSchool: { type: String },
    medicalFacility: { type: String },
    petArea: { type: String },
    indoorGames: { type: String },
    conferenceRoom: { type: String },
    helipad: { type: String },
    multiplex: { type: String },
    visitorsParking: { type: String },
    serviceElevators: { type: String },
    atm: { type: String },
    foodCourt: { type: String },
    serventQuarter: { type: String },
    gatedSociety: { type: String },
    studyRoom: { type: String },
    privatePool: { type: String },
    privateGym: { type: String },
    viewOfLandmark: { type: String },
    areas: { type: String },
    SpreadA: { type: String },

    adjoiningMetroStation: { type: String },
    pacefulVicinity: { type: String },
    wideRoad: { type: String },
    cityCenter: { type: String },
    safeSecureLocality: { type: String },
    desparateSale: { type: String },
    breakthroughPrice: { type: String },
    quickDeal: { type: String },
    investmentOpportunity: { type: String },
    highRentalYield: { type: String },
    affordable: { type: String },
    reputedBuilder: { type: String },
    wellVentilated: { type: String },
    fullyRenovated: { type: String },
    vastuCompliant: { type: String },
    spacious: { type: String },
    ampleParking: { type: String },
    freeHold: { type: String },

    tastefulInteriors: { type: String },
    primeLocation: { type: String },
    luxuryLifestyle: { type: String },
    wellMaintained: { type: String },
    plentyOfSunlight: { type: String },
    newlyBuilt: { type: String },
    propertyDescription: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Propery = model("Property", PropertySchema, "property");

// make this available to our users in our Node applications
module.exports = Propery;

// const { Schema, model } = require("mongoose");
// const PropertySchema = new Schema({
//   verifyStatus: {
//     type: String,
//     default: "pending",
//     enum: ["pending", "verified", "rejected"],
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//        media: [
//           {
//            preview: { type: String },
//             url: { type: String },
//             type: { type: String },
//          },
//         ],
//   },
// city:{ type: String},
// projectname:{ type: String, required: true},
// locality:{ type: String},
// area: { type: String},
// price:{ type: Number},
// includediInPrice:{ type: Str}

// });
// const Propery = model("Property", PropertySchema);
// module.exports = Propery;
