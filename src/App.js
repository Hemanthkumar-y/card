import {useState} from 'react';
import './App.css';
import {
  Card, CardImg, Form, FormGroup, Label, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Input, FormText, Col, Row,
} from 'reactstrap';

function App() {

  const [cardNumber, setcardNumber] = useState(0);
  const [cvCode, setcvCode] = useState(0);
  const [userName, setuserName] = useState("");
  const [error, seterror] = useState(false);
  const [date, setdate] = useState(0);


  function setcardNumberhandler(e) {
      setcardNumber(e.target.value);
      if(cardNumber.length<16){
        seterror(true);
      } else{
        seterror(false);
      }
  }

  const additem = (e) => {
		e.preventDefault();
		fetch(" http://localhost:8999/", {
			method: "POST",
			body: JSON.stringify({CardNumber:cardNumber,
        CVcode :cvCode,
        userName:userName
      }),
			headers:{
				'Content-Type':'application/json'
			},
		}).then(r => r.json())
		.then(resp => {
			console.log('Got data from backend', resp);
		});	
	};

  console.log(cvCode);
  console.log(userName);
  console.log(cardNumber);
  console.log(date);
  
  return (
    <div className="App">
      <Card>
        <CardTitle tag="h5">Payment-Details</CardTitle>
        <CardBody>
          <FormGroup>
            <Label for="Example-Card">Card-Number</Label>
            {
              (!error) ? (
                <>
                <Input type="number" name="number" placeholder="Enter the CardNumber"
                  value={cardNumber} onChange={setcardNumberhandler} />
    
                  </>
                  ):(
                  <>
                    <Input type="number" name="number" placeholder="Enter the CardNumber"
                      value={cardNumber} onChange={setcardNumberhandler} />
                     <h7>Error</h7>
                    </>
                    )
                      }
          </FormGroup>
                    <Row form>
                      <Col md={8}>
                        <FormGroup>
                          <Label >Expiration-data</Label>
                          <Input type="date"
                            value={date}
                            onChange={(e) => setdate(e.target.value)} />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label >CV code</Label>
                          <Input type="number" 
                          value={cvCode}
                          onChange={(e) => setcvCode(e.target.value)}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label >Card-Owner</Label>
                      <Input type="text" placeholder="Card-owener-name"
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)} />
                    </FormGroup>
                    <Button onClick={additem} >Submit</Button>
                  </CardBody>
      </Card>

    </div>
  );
}

export default App;
