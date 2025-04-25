
async function main() {

  console.log('🌱 Seeding database...')

  //create the ingredients and recipes with faker here.
  await new Promise(resolve => setTimeout(resolve, 1000))

  console.log('✅ Database seeded successfully!')
}

main().catch(error => {
  console.error('❌ Error seeding database:', error)
  process.exit(1)
})
