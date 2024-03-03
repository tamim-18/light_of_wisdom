const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Web Development" },
        { name: "Mobile Development" },
        { name: "Game Development" },
        { name: "Data Science" },
        { name: "Machine Learning" },
        { name: "Artificial Intelligence" },
        { name: "Cybersecurity" },
        { name: "Cloud Computing" },
        { name: "DevOps" },
        { name: "Quality Assurance" },
        { name: "Project Management" },
        { name: "Digital Marketing" },
        { name: "UI/UX Design" },
        { name: "Product Management" },
        { name: "Sales" },
        { name: "Human Resources" },
        { name: "Finance" },
        { name: "Accounting" },
        { name: "Leadership" },
        { name: "Personal Development" },
        { name: "Career Development" },
        { name: "Business Law" },
        { name: "Business Analytics" },
        { name: "Other" },
      ],
    });
    console.log("Database seeded successfully");
  } catch (error) {
    console.log("Error seeding database: ", error);
  } finally {
    await database.$disconnect();
  }
}
main();
