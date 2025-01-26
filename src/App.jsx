import './styles/styles.css';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Card from './components/Card';
import Wrapper from './components/Wrapper';

function App() {
  const cardsData = [
    { title: "Me", description: "I am a student studying web design." },
    { title: "My Hobbies", description: "I enjoy coding, music, and basketball." },
    { title: "Contact Me", description: "Reach me at vherce@purdue.edu" }
  ];

  return (
    <div className="app-container">
      <Header />
      <Introduction />
      <Wrapper>
        <div className="card-container">
          {cardsData.map((card, index) => (
            <Card key={index} title={card.title} description={card.description}>
              <button onClick={() => alert(`More info about ${card.title}`)}>More Info</button>
            </Card>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}

export default App;
