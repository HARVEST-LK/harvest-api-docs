const sidebars = {
  docs: [
    {
      type: "category",
      label: "Overview",
      items: ["api/overview"],
    },
    {
      type: "category",
      label: "GN Division Endpoints",
      items: ["api/GN_DivisionCRUD"],
    },
    {
      type: "category",
      label: "AG Office Endpoints",
      items: ["api/AG_OfficeCRUD"],
    },
    {
      type: "category",
      label: "Admin Endpoints",
      items: ["api/AdminCRUD"],
    },
    {
      type: "category",
      label: "Farmer Endpoints",
      items: ["api/FarmerCRUD"],
    },
    {
      type: "category",
      label: "File Upload",
      items: ["api/fileUpload"],
    },

    // ✅ ADD THIS BLOCK
    {
      type: "category",
      label: "Database Documentation",
      items: ["api/DatabaseDocumentation"],
    },
  ],
};

export default sidebars;
