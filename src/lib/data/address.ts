/**
 * Bangladesh division -> district -> area hierarchy for the checkout address form.
 * This is a representative subset (not exhaustive) — easy to extend with more
 * districts/areas per division, or swap for a full dataset/API later.
 */
export interface AreaNode {
  name: string;
  districts: { name: string; areas: string[] }[];
}

export const divisions: AreaNode[] = [
  {
    name: "Dhaka",
    districts: [
      { name: "Dhaka", areas: ["Banani", "Gulshan", "Dhanmondi", "Mirpur", "Uttara", "Mohammadpur", "Badda", "Motijheel"] },
      { name: "Gazipur", areas: ["Gazipur Sadar", "Tongi", "Kaliakair"] },
      { name: "Narayanganj", areas: ["Narayanganj Sadar", "Siddhirganj", "Fatullah"] },
      { name: "Tangail", areas: ["Tangail Sadar", "Mirzapur"] },
    ],
  },
  {
    name: "Chattogram",
    districts: [
      { name: "Chattogram", areas: ["Agrabad", "Panchlaish", "Halishahar", "GEC Circle"] },
      { name: "Cox's Bazar", areas: ["Cox's Bazar Sadar", "Teknaf"] },
      { name: "Comilla", areas: ["Comilla Sadar", "Debidwar"] },
    ],
  },
  {
    name: "Khulna",
    districts: [
      { name: "Khulna", areas: ["Khulna Sadar", "Sonadanga", "Khalishpur"] },
      { name: "Jessore", areas: ["Jessore Sadar"] },
    ],
  },
  {
    name: "Rajshahi",
    districts: [
      { name: "Rajshahi", areas: ["Rajshahi Sadar", "Boalia", "Motihar"] },
      { name: "Bogura", areas: ["Bogura Sadar"] },
    ],
  },
  {
    name: "Sylhet",
    districts: [{ name: "Sylhet", areas: ["Zindabazar", "Amberkhana", "Shahjalal Upashahar"] }],
  },
  {
    name: "Barishal",
    districts: [{ name: "Barishal", areas: ["Barishal Sadar", "Band Road"] }],
  },
  {
    name: "Rangpur",
    districts: [{ name: "Rangpur", areas: ["Rangpur Sadar"] }],
  },
  {
    name: "Mymensingh",
    districts: [{ name: "Mymensingh", areas: ["Mymensingh Sadar"] }],
  },
];
