import { useState, useRef } from "react";
import { Col,Row,Form,Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import { addMail } from "../../store/MailAction";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeMail = () =>{

    const dispatch = useDispatch();
    const inputMailRef =useRef();
    const inputSubjectRef = useRef();
    const [editorState , setEditorState] = useState(()=> EditorState.createEmpty() );
    const editorHandler=(editorState)=>{
        setEditorState(editorState);
     }
     const composeMailHandler=(event)=>{
        event.preventDefault();
       console.log("compose button clicked");
       const mailData = {
         from : localStorage.getItem('email'),
         to : inputMailRef.current.value,
         title : inputSubjectRef.current.value,
         message : editorState.getCurrentContent().getPlainText()
       }
       console.log(mailData);
       dispatch(addMail(mailData));
       inputMailRef.current.value=""
        inputSubjectRef.current.value=""
        setEditorState(null)
     }
    return(
        <div>
            <div style={{width:60+"%" , justifyContent:"center" , margin:"auto"} }>
      <Form   onSubmit={composeMailHandler}>
         
        <Container><Row >
          <Col xs={1}>
            <Form.Label>To</Form.Label>
          </Col>
          <Col>
            <Form.Control ref={inputMailRef} type="email" placeholder="Enter email" />
          </Col>
        </Row>     
        <Row>
          <Col xs={1}>
          <Form.Label>Subject</Form.Label>
          </Col>
          <Col>
            <Form.Control  ref={inputSubjectRef} type="text" placeholder="Subject" />
          </Col>
        </Row>
        <Row>
        <Col xs={1}>
          <Form.Label>ComposeMail</Form.Label>
          </Col>
        <Col>
        <textarea 
            editorState={editorState}
            onEditorStateChange={editorHandler}
            /></Col>
        </Row>
        </Container>
        <Button variant="secondary" type="submit" className="mt-2 mb-2">Send</Button>
      </Form>
    </div>
        </div>
    );
}
export default ComposeMail;