import {
  MDBCardFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function MessageInput(){
  return (
    <div className='d-flex justify-content-center'>
      <MDBCardFooter className="text-white position-absolute bottom-0 p-3 d-flex align-items-center w-75">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
          alt="avatar 3"
          style={{ width: "45px", height: "100%" }}
        />
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput1"
          placeholder="Type message"
        ></input>
        <a className="ms-1 text-white" href="#!">
          <MDBIcon fas icon="paperclip" />
        </a>
        <a className="ms-3 text-white" href="#!">
          <MDBIcon fas icon="smile" />
        </a>
        <a className="ms-3" href="#!">
          <MDBIcon fas icon="paper-plane" />
        </a>
      </MDBCardFooter> 
    </div>
  )
}


