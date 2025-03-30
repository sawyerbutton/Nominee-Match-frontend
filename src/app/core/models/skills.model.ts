export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillGroup[];
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'web2',
    name: 'Web2 开发',
    skills: [
      {
        id: 'frontend',
        name: '前端开发',
        skills: [
          { id: 'html5', name: 'HTML5' },
          { id: 'css3', name: 'CSS3' },
          { id: 'javascript', name: 'JavaScript' },
          { id: 'typescript', name: 'TypeScript' },
          { id: 'angular', name: 'Angular' },
          { id: 'react', name: 'React' },
          { id: 'vue', name: 'Vue' },
          { id: 'webpack', name: 'Webpack' },
          { id: 'vite', name: 'Vite' }
        ]
      },
      {
        id: 'backend',
        name: '后端开发',
        skills: [
          { id: 'nodejs', name: 'Node.js' },
          { id: 'python', name: 'Python' },
          { id: 'java', name: 'Java' },
          { id: 'go', name: 'Go' },
          { id: 'spring', name: 'Spring' },
          { id: 'django', name: 'Django' },
          { id: 'flask', name: 'Flask' },
          { id: 'express', name: 'Express' },
          { id: 'nestjs', name: 'NestJS' }
        ]
      },
      {
        id: 'database',
        name: '数据库',
        skills: [
          { id: 'mysql', name: 'MySQL' },
          { id: 'postgresql', name: 'PostgreSQL' },
          { id: 'mongodb', name: 'MongoDB' },
          { id: 'redis', name: 'Redis' },
          { id: 'elasticsearch', name: 'Elasticsearch' }
        ]
      },
      {
        id: 'devops',
        name: 'DevOps',
        skills: [
          { id: 'docker', name: 'Docker' },
          { id: 'kubernetes', name: 'Kubernetes' },
          { id: 'jenkins', name: 'Jenkins' },
          { id: 'git', name: 'Git' },
          { id: 'aws', name: 'AWS' },
          { id: 'azure', name: 'Azure' },
          { id: 'gcp', name: 'Google Cloud' }
        ]
      }
    ]
  },
  {
    id: 'web3',
    name: 'Web3 开发',
    skills: [
      {
        id: 'blockchain',
        name: '区块链开发',
        skills: [
          { id: 'solidity', name: 'Solidity' },
          { id: 'web3js', name: 'Web3.js' },
          { id: 'ethersjs', name: 'Ethers.js' },
          { id: 'hardhat', name: 'Hardhat' },
          { id: 'truffle', name: 'Truffle' },
          { id: 'openzeppelin', name: 'OpenZeppelin' }
        ]
      },
      {
        id: 'defi',
        name: 'DeFi 开发',
        skills: [
          { id: 'uniswap', name: 'Uniswap' },
          { id: 'aave', name: 'Aave' },
          { id: 'compound', name: 'Compound' },
          { id: 'curve', name: 'Curve' }
        ]
      },
      {
        id: 'nft',
        name: 'NFT 开发',
        skills: [
          { id: 'erc721', name: 'ERC-721' },
          { id: 'erc1155', name: 'ERC-1155' },
          { id: 'ipfs', name: 'IPFS' }
        ]
      }
    ]
  }
];
