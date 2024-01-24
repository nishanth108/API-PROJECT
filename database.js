//creating arrya of object for the E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi
const books =[
  {
    ISBN :"1234ABCD",
    title :"rock",
    pubDate :"2023-12-6",
    language:"en",
    numPage :240,
    author :[1,2],
    publication :[1],
    category: ["science","comedy","space"]
  },
  {
    ISBN :"45",
    title :"nicj",
    pubDate :"2023-12-6",
    language:"en",
    numPage :240,
    author :[1,2],
    publication :[1],
    category: ["science","comedy","space"]
  }

];

const author =[
  {
    id :1,
    name :"nick",
    books:["1234ABCD","secret lies"]
  },
  {
    id :2,
    name:"rock",
    books:["1234ABCD","the momentum"]
  }
];

const publication = [
  {
    id :1,
    name:"rinchu",
    books:["1234ABCD"]
  },
  {
    id :2,
    name:"mahi",
    books:[]
  }

];

module.exports ={ books , author , publication};
