import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { replacemail } from '../../store/MailAction';
import { Card, Container } from 'react-bootstrap';

const MailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const mails = useSelector((state) => state.mail.mailData);
    const email = localStorage.getItem("email");
    const inboxMail = mails.filter(mail => mail.to === email);
    const pageMail = inboxMail.filter(mail => mail.id === id);
    const mailid = pageMail[0].to.replace("@", "").replace(".", "");
    //put request 
    const readTrue = async () => {
        try {
            const res = await fetch(`https://mailbox-79617-default-rtdb.firebaseio.com/${mailid}/${pageMail[0].id}.json`, {
                method: "PUT",
                body: JSON.stringify({ ...pageMail[0], read: false }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(replacemail(`${mailid}`));
            } else {
                throw data.error
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    readTrue();
    return (
        <Container className='mt-3'>
            <Card>
                <Card.Body>
                    <Card.Title>From :- {pageMail[0].from}</Card.Title>
                    <Card.Title>To:- {pageMail[0].to}</Card.Title>
                    <Card.Text>
                        Subject :- {pageMail[0].title}
                    </Card.Text>
                    <Card.Text>
                        {pageMail[0].message}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default MailPage;