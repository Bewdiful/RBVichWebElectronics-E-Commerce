export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "gaming-pcs", label: "Gaming PCs" },
      { id: "gaming-accessories", label: "Gaming Accessories" },
      { id: "laptops-notebooks", label: "Laptops & Notebooks" },
      { id: "peripherals", label: "Peripherals" },
      { id: "consoles", label: "Consoles" },
      { id: "monitors-displays", label: "Monitors & Displays" },
      { id: "memory", label: "Memory" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "razer", label: "Razer" },
      { id: "steelseries", label: "SteelSeries" },
      { id: "logitech", label: "Logitech" },
      { id: "corsair", label: "Corsair" },
      { id: "msi", label: "MSI" },
      { id: "alienware", label: "Alienware" },
      { id: "asus", label: "ASUS" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/shop/contact",
  },
  {
    id: "blog",
    label: "Blog",
    path: "/shop/blog",
  },
];

export const categoryOptionsMap = {
  "gaming-pcs": "Gaming PCs",
  "gaming-accessories": "Gaming Accessories",
  "laptops-notebooks": "Laptops & Notebooks",
  peripherals: "Peripherals",
  consoles: "Consoles",
  "monitors-displays": "Monitors & Displays",
  memory: "Memory",
};

export const brandOptionsMap = {
  razer: "Razer",
  steelseries: "SteelSeries",
  logitech: "Logitech",
  corsair: "Corsair",
  msi: "MSI",
  alienware: "Alienware",
  asus: "ASUS",
};

export const filterOptions = {
  category: [
    { id: "gaming-pcs", label: "Gaming PCs" },
    { id: "gaming-accessories", label: "Gaming Accessories" },
    { id: "laptops-notebooks", label: "Laptops & Notebooks" },
    { id: "peripherals", label: "Peripherals" },
    { id: "consoles", label: "Consoles" },
    { id: "monitors-displays", label: "Monitors & Displays" },
    { id: "memory", label: "Memory" },
  ],
  brand: [
    { id: "razer", label: "Razer" },
    { id: "steelseries", label: "SteelSeries" },
    { id: "logitech", label: "Logitech" },
    { id: "corsair", label: "Corsair" },
    { id: "msi", label: "MSI" },
    { id: "alienware", label: "Alienware" },
    { id: "asus", label: "ASUS" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];