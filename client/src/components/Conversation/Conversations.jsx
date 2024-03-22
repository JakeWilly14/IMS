import MessageInput from './MessageInput/MessageInput'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdb-react-ui-kit";

export default function Conversation() {
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard className="w-auto p-3" id="chat2" style={{ width: "80vw", height: "75vh" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0 text-white">You have landed with: $friend.username!</h5>
            </MDBCardHeader>
            <div className="custom-scrollbar" style={{ maxHeight: "400px", overflow: "auto" }}>
              <MDBCardBody>
                
              </MDBCardBody>
            </div>
            <MessageInput />
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}