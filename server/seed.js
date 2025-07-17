const mongoose = require("mongoose");
const Project = require("./models/Project");
const Skill = require("./models/Skill");

const MONGO_URI =
  process.env.MONGO_URI;

const projects = [
  {
    title: "AI Chatbot Platform",
    description: "A platform for building and deploying AI chatbots.",
    category: "AI/Machine Learning",
    technologies: ["React", "Node.js", "TensorFlow"],
    images: ["/images/ai-chatbot-1.png"],
    liveUrl: "https://aichatbot.example.com",
    githubUrl: "https://github.com/samuelvictor/aichatbot",
    features: ["Conversational AI", "Customizable Flows"],
    isFeatured: true,
    isActive: true,
  },
  {
    title: "Web3 NFT Marketplace",
    description: "A decentralized marketplace for NFTs.",
    category: "Web3/Blockchain",
    technologies: ["React", "Solidity", "Ethereum"],
    images: ["/images/nft-marketplace-1.png"],
    liveUrl: "https://nftmarket.example.com",
    githubUrl: "https://github.com/samuelvictor/nftmarket",
    features: ["Minting", "Wallet Integration"],
    isFeatured: false,
    isActive: true,
  },
];

const skills = [
  { name: "React", category: "framework", proficiency: 90 },
  { name: "Node.js", category: "framework", proficiency: 85 },
  { name: "Python", category: "language", proficiency: 80 },
];

async function seed() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Project.deleteMany({});
  await Skill.deleteMany({});
  await Project.insertMany(projects);
  await Skill.insertMany(skills);
  console.log("Database seeded!");
  mongoose.disconnect();
}

seed();
