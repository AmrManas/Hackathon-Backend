const step1 = [
  {
    lable: "Looking For",
    type: "radio",
    name: "status",
    options: [
      { id: "sale", lable: "Sale" },
      { id: "rent", lable: "Rent" },
    ],
  },
  {
    lable: "Building Type",
    type: "radio",
    name: "buildingType",
    options: [
      { id: "residential", lable: "Residential" },
      { id: "commercial", lable: "Commercial" },
    ],
  },
  {
    lable: "Property Type",
    type: "radio",
    name: "propertyType",
    check: "buildingType",
    options: {
      residential: [
        { id: "apartment", lable: "Apartment" },
        { id: "villa", lable: "Villa" },
        { id: "plot", lable: "Plot" },
        { id: "builderFloor", lable: "Builder Floor" },
        { id: "penthouse", lable: "Penthouse" },
        { id: "apartment", lable: "Apartment" },
        { id: "independentHouse", lable: "Independent House" },
      ],
      commercial: [
        { id: "officeSpace", lable: "Office Space" },
        { id: "shop", lable: "Shop" },
        { id: "land", lable: "Land" },
        { id: "officeSpaceInIT/SEZ", lable: "Office Space in IT/SEZ" },
        { id: "showroom", lable: "Showroom" },
        { id: "warehouse", lable: "Warehouse" },
        { id: "industrialPlot", lable: "Industrial Plot" },
      ],
    },
  },
  {
    lable: "City",
    type: "text",
    name: "city",
    size: "1/2",
  },
  {
    lable: "Project/Building name",
    type: "text",
    name: "projectName",
    size: "1/2",
  },
  {
    lable: "Locality",
    type: "text",
    name: "address",
    size: "1/2",
  },
  {
    lable: "Area Details",
    filter: [{ id: "sqft", lable: "Sq ft." }],
    type: "extra",
    sub: [
      [
        {
          lable: "Area",
          type: "text",
          name: "area",
          size: "1/2",
        },
        {
          lable: "Area Type",
          type: "text",
          name: "areaType",
          size: "1/2",
        },
      ],
    ],
  },
  {
    lable: "Price",
    type: "text",
    name: "price",
    size: "1/3",
  },
  {
    lable: "Maintenance",
    type: "text",
    name: "maintenance",
  },
  {
    lable: "Security Deposit",
    type: "tag",
    name: "securityDeposit",
    options: [
      { id: "zeroDeposite", lable: "Zero Deposite" },
      { id: "oneMonth", lable: "One Month" },
      { id: "twoMonth", lable: "Two Month" },
      { id: "other", lable: "Other" },
    ],
  },
];

module.exports = step1;
