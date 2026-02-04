export const SERVICE_CATEGORIES = [
  {
    id: 'plumbing',
    label: 'Plumbing',
    icon: 'plumbing',
    subServices: [
      { id: 'plumbing_emergency', label: 'Emergency plumbing' },
      { id: 'plumbing_leak_repair', label: 'Leak repair' },
      { id: 'plumbing_tap_fitting', label: 'Tap & mixer installation' },
      { id: 'plumbing_blockage', label: 'Drain / toilet blockage' },
      { id: 'plumbing_bathroom_fitting', label: 'Bathroom fitting' },
      { id: 'plumbing_geyser_install', label: 'Geyser installation & repair' }
    ]
  },
  {
    id: 'electrical',
    label: 'Electrical',
    icon: 'electrical',
    subServices: [
      { id: 'elec_wiring', label: 'House wiring & rewiring' },
      { id: 'elec_switchboard', label: 'Switchboard & MCB' },
      { id: 'elec_fan', label: 'Fan installation & repair' },
      { id: 'elec_lighting', label: 'Indoor/outdoor lighting' },
      { id: 'elec_inverter', label: 'Inverter & stabilizer' }
    ]
  },
  {
    id: 'appliance',
    label: 'Appliance Repair',
    icon: 'appliance',
    subServices: [
      { id: 'app_ac', label: 'AC service & repair' },
      { id: 'app_fridge', label: 'Refrigerator repair' },
      { id: 'app_washing_machine', label: 'Washing machine repair' },
      { id: 'app_microwave', label: 'Microwave repair' },
      { id: 'app_ro', label: 'RO / water purifier service' }
    ]
  },
  {
    id: 'cleaning',
    label: 'Cleaning',
    icon: 'cleaning',
    subServices: [
      { id: 'clean_full_home', label: 'Full home deep cleaning' },
      { id: 'clean_kitchen', label: 'Kitchen deep cleaning' },
      { id: 'clean_bathroom', label: 'Bathroom deep cleaning' },
      { id: 'clean_sofa', label: 'Sofa & upholstery cleaning' },
      { id: 'clean_mattress', label: 'Mattress cleaning' },
      { id: 'clean_carpet', label: 'Carpet cleaning' }
    ]
  },
  {
    id: 'pest_control',
    label: 'Pest Control',
    icon: 'pest',
    subServices: [
      { id: 'pest_cockroach', label: 'Cockroach control' },
      { id: 'pest_termites', label: 'Termite treatment' },
      { id: 'pest_bedbugs', label: 'Bedbug treatment' },
      { id: 'pest_rodents', label: 'Rodent control' },
      { id: 'pest_mosquito', label: 'Mosquito & flies control' }
    ]
  },
  {
    id: 'painting',
    label: 'Painting & Waterproofing',
    icon: 'painting',
    subServices: [
      { id: 'paint_interior', label: 'Interior painting' },
      { id: 'paint_exterior', label: 'Exterior painting' },
      { id: 'paint_touchup', label: 'Room repaint / touch-up' },
      { id: 'paint_texture', label: 'Texture & designer walls' },
      { id: 'waterproofing_roof', label: 'Roof & terrace waterproofing' },
      { id: 'waterproofing_bathroom', label: 'Bathroom waterproofing' }
    ]
  },
  {
    id: 'carpentry',
    label: 'Carpentry & Modular',
    icon: 'carpentry',
    subServices: [
      { id: 'carp_furniture', label: 'Furniture making & repair' },
      { id: 'carp_door_window', label: 'Door & window repair' },
      { id: 'carp_modular_kitchen', label: 'Modular kitchen' },
      { id: 'carp_wardrobe', label: 'Wardrobe & storage' }
    ]
  },
  {
    id: 'renovation',
    label: 'Renovation & Civil',
    icon: 'renovation',
    subServices: [
      { id: 'reno_bathroom', label: 'Bathroom renovation' },
      { id: 'reno_kitchen', label: 'Kitchen remodeling' },
      { id: 'reno_flooring', label: 'Tiling & flooring' },
      { id: 'reno_partition', label: 'Partition walls & false ceiling' }
    ]
  },
  {
    id: 'hvac',
    label: 'HVAC & Ventilation',
    icon: 'hvac',
    subServices: [
      { id: 'hvac_split_install', label: 'Split AC installation' },
      { id: 'hvac_cassette', label: 'Cassette / duct AC service' },
      { id: 'hvac_maintenance', label: 'Annual maintenance (AMC)' }
    ]
  },
  {
    id: 'smart_home',
    label: 'Smart Home & Security',
    icon: 'smart_home',
    subServices: [
      { id: 'smart_cctv', label: 'CCTV & NVR setup' },
      { id: 'smart_doorlock', label: 'Smart locks & access' },
      { id: 'smart_automation', label: 'Home automation' },
      { id: 'smart_wifi', label: 'Wi-Fi & network setup' }
    ]
  },
  {
    id: 'handyman',
    label: 'Handyman & Misc',
    icon: 'handyman',
    subServices: [
      { id: 'handyman_drilling', label: 'Drilling & mounting' },
      { id: 'handyman_tv', label: 'TV wall mounting' },
      { id: 'handyman_furniture_assembly', label: 'Furniture assembly' },
      { id: 'handyman_minor_repairs', label: 'Minor home repairs' }
    ]
  }
];

export const ALL_SUB_SERVICES = SERVICE_CATEGORIES.flatMap(cat =>
  cat.subServices.map(s => ({ ...s, categoryId: cat.id }))
);

