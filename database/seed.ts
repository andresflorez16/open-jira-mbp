interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
	entries: [
		{
      description: 'Do process automation',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'Nextjs course',
      status: 'in-progress',
      createdAt: Date.now()
    },
    {
      description: 'Eat my breakfast',
      status: 'finished',
      createdAt: Date.now()
    }
	]
}
