import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const ContactList = props => {
    const [chats, setChats] = useState([1, 2, 3]);
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {

        const fetchContacts = async (user) => {
            const request = new Request('http://localhost:5000/api/chats?' + new URLSearchParams({
                userId: props.auth.user.id,
            }), {
                method: "GET",
                headers: {
                },
            },
            );
            const response = await fetch(request);
            const data = await response.json();
            setChats(data);
            setDoneLoading(true);
        }
        fetchContacts()
            .catch(console.error);
    }, [])

    let seen_ad_ids = [];

    return (
        <div>
            <Container maxWidth="md">
                {!doneLoading ? <LoadingScreen /> : <React.Fragment>
                    <br />
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        <b>Recent chats</b>
                    </Typography><br />
                    {chats.map((user, index) => user._id !== props.auth.user.id && !seen_ad_ids.includes(user.adId) && seen_ad_ids.push(user.adId) && (
                        <Box sx={{ minWidth: 275 }} key={"chat_" + index}>
                            <Card variant="outlined">
                                <RouterLink to={'/ad/' + user.adId + '/user/' + user._id + '/chat'}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ color: "black" }}>
                                            {user.name}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} style={{ color: "black" }}>
                                            {"for ad '" + user.adName + "'"}
                                        </Typography>
                                    </CardContent>
                                </RouterLink>
                            </Card>
                            <br />
                        </Box>
                    ))}
                </React.Fragment>}
            </Container>
        </div>
    );
}

export default connect(mapStateToProps, null)(ContactList);
