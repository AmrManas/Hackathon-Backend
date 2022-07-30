const { Schema, model } = require("mongoose");

const PropertyNewSchema = new Schema(
  {
    verifyStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "verified", "rejected"],
    },
    lookingfor: {
      type: String,
    },
    buildingtype: { type: String },
    propertytype: { type: String },
    projectName: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    address: {
      state: { type: String },
      locality: { type: String },
      area: { type: String },
      areaType: { type: String },
    },
    price: { type: String },
    city: { type: String },
    country: { type: String },

    ammenities: [
      {
        type: String,
        enum: [
          "Gymnasium",
          "Swimming Pool",
          "Badminton Court(s)",
          "Tennis Court(s)",
          "Squash Court(s)",
          "Kid's Play Areas",
          "Jogging / Cycle Track",
          "Power Backup",
          "Central AC",
          "Central Wi-Fi",
          "Attached Market",
          "Restaurant",
          "Home Automation",
          "24 x 7 Security",
          "Clubhouse",
          "Balcony",
          "High Speed Elevators",
          "Pre-School",
          "Medical Facility",
          "Day Care Center",
          "Pet Area",
          "Indoor Games",
          "Conference Room",
          "Large Green Area",
          "Concierge Desk",
          "Helipad",
          "Golf Course",
          "Multiplex",
          "Visitor's Parking",
          "Serviced Apartments",
          "Service Elevators",
          "High Street Retail",
          "Hypermarket",
          "ATM's",
          "Food Court",
          "Servant Quarter",
          "Study Room",
          "Private Pool",
          "Private Gym",
          "Private Jacuzzi",
          "View of Water",
          "View of Landmark",
          "Built in Wardrobes",
        ],
      },
    ],
    suitableFor: [
      {
        type: String,
        enum: ["Family", "Bachelors", "Females Only"],
      },
    ],
    defineprice: [
      {
        type: String,
        enum: [
          "Desparate sale",
          "Breakthrough price",
          "Quick deal",
          "Investment opportunity",
          "High rental yield",
          "Affordable",
        ],
      },
    ],
    defineproperty: [
      {
        type: String,
        enum: [
          "Reputed builder",
          "Well ventilated",
          "Fully renovated",
          "Vastu compliant",
          "Spacious",
          "Ample parking",
          "Free hold",
          "Gated society",
        ],
      },
    ],
    additionalRooms: [
      {
        type: String,
        enum: ["Prayer room", "Servent room", "Study room", "Extra room"],
      },
    ],
    deinesizeAndStructure: [
      {
        type: String,
        enum: [
          "Tasteful interiors",
          "Prime location",
          "Luxury lifestyle",
          "Well maintained",
          "Plenty of sunlight",
          "Newly built",
        ],
      },
    ],
    features: {
      // additionalRooms: { type: String },
      possessionStatus: { type: String },
      furnishedStatus: { type: String },
      numberOfRooms: { type: String },
      numberOfBathrooms: { type: String },
      numberOfParkings: { type: String },
    },
    description: { type: String },
    ageOfProperty: { type: String },
    details: {
      viewOrFacing: { type: String },
      towerOrBlock: { type: String },
      totalFloorCount: { type: String },
      unitNo: { type: String },
    },
    definingLocation: [
      {
        type: String,
        enum: [
          "Schools in vicinity",
          "Adjoining metro station",
          "Paceful vicinity",
          "Wide road",
          "City center",
          "Safe & secure locality",
        ],
      },
    ],
    media: [
      {
        preview: { type: String },
        url: { type: String },
        type: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("PropertyNew", PropertyNewSchema, "property");
