import React, { Component } from 'react';
import classes from './PatientsForms.module.css';
import Scrollbar from '../../../UI/Scrollbar/Scrollbar';
import close from '../../../assets/images/close.png';
import axios from '../../../axios';
import Login from '../../../UI/Login/Login';
import Image from "../../../UI/Form/Image/Image";
import Input from "../../../UI/Form/Input/Input";

class patientsForms extends Component {
    state = {
        firstName: '',
        gender: 'Male',
        email: '',
        date_of_birth: '',
        address: '',
        phoneNumber: '',
        submitted: false,
        loggedIn: false,
        runComponentDidUpdateOnce: true
    }

    componentDidUpdate() {
        if (this.props.id && this.state.runComponentDidUpdateOnce) {
            this.setState({ runComponentDidUpdateOnce: false });
            axios.get(`/patients/${this.props.id}`)
                .then((response) => {
                this.setState({
                    firstName: response.data.firstName + ' ' + response.data.lastName,
                    gender: response.data.gender,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    date_of_birth: response.data.date_of_birth
                });
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    postDataHandler = () => {
        let add = 'add';
        if (this.props.id) add = this.props.id;
        const dataName = this.state.firstName.split(' ');
        const data = {
            firstName: dataName[0],
            lastName: dataName[1],
            jobDescription: this.state.jobDescription,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender
        };
        // this.setState((prevState) => {
        //     return {firstName: prevState.firstName}
        // });
        this.setState({submitted: true});
        // axios.post('/AddUser', data)
        axios.post(`/patients/${add}`, data)
            .then(response => {
                this.setState({submitted: false});
                // console.log(response.data);
                // this.props.history.push('/Posts');
                // this.props.history.replace('/Posts');
            })
            .then(() => {
                this.setState({
                    firstName: '',
                    gender: 'Male',
                    email: '',
                    phoneNumber: '',
                    date_of_birth: '',
                    address: '',
                    loggedIn: true
                });
            })
            .catch(error => {
                this.setState({submitted: false});
                console.log(error);
            });
    }

    loadDataHandler = () => {
        console.log(this.props.id);
    }

    render () {
        if (this.state.loggedIn) {
            setTimeout(() => {
                this.setState({loggedIn: false})
            }, 500);
        }
        return (
            <div className={this.props.show ? classes.PatientsForms : classes.PatientsForms + ' ' + classes.active}>
                {this.state.loggedIn ? <Login login='block' text="Successful" /> : null}
                {this.state.submitted ? <Login spinner='show' login='none' /> : null}
                <h1>{this.props.name} Patient <img src={close} onClick={this.props.clicked} alt='' /></h1>
                <Scrollbar>
                    <form>
                        <Image classes={classes.picture} title={"Profile Picture"} src={process.env.PUBLIC_URL + "/assets/img/patient.png"} />
                        <Input title={"Name"} value={this.state.firstName} changed={(event) => this.setState({firstName: event.target.value})} />
                        <Input title={"Email Address"} value={this.state.email} changed={(event) => this.setState({email: event.target.value})} />
                        <Input inputType={true} title={"Gender"} select={["Male", "Female"]} value={this.state.gender} changed={(event) => this.setState({gender: event.target.value})} />
                        <Input title={"Birth Date"} value={this.state.date_of_birth} changed={(event) => this.setState({date_of_birth: event.target.value})} />
                        <Input style={{width: '100%'}} title={"Address"} value={this.state.address} changed={(event) => this.setState({address: event.target.value})} />
                        <Input classes={classes.telephone} title={"Telephone"} value={this.state.phoneNumber} changed={(event) => this.setState({phoneNumber: event.target.value})} />
                        <Input classes={classes.blood} style={{width: '100%'}} inputType={true} title={"Blood Group"} select={["A", "B", "AB", "O"]}/>
                    </form>
                    <button className={classes.create} onClick={this.postDataHandler}>{this.props.name} Patient</button>
                </Scrollbar>
            </div>
    );
    }
}

export default patientsForms;