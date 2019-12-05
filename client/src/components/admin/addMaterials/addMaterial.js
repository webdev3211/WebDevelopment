import React, { Component } from 'react'
import axios from 'axios';

class addMaterial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {},
            file: {},
            name: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


    }


    componentDidMount() {
        const { id } = this.props.match.params;

        console.log(id);

        axios.get(`/admin/course/${id}`).then(course => {
            // console.log(course);
            this.setState({
                course: course.data
            })
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    onChange2(e) {
        this.setState({
            file: e.target.files[0]
        })
        console.log(e.target.files[0]);
    }


    onSubmit = async e => {

        console.log(e);

        e.preventDefault();


        const { id } = this.props.match.params;

        const formData = new FormData();
        formData.append('name', "FileUpload")
        formData.append('file', this.state.file);


        try {

            const res = await axios.post(`/admin/addMaterials/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });


            console.log('Course material uploaded');

        } catch (err) {

            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }

        }

    }


    render() {
        return (
            <div className="container" style={{ marginBottom: '100px' }}>

                <img src={`/uploads/course/${this.state.course.file}`} alt="course image" style={{ width: '100%', height: '100%' }} />


                <h1 className="text-center" style={{ fontFamily: 'Montserrat', marginTop: "100px", marginBottom: '100px' }}>
                    {this.state.course.name}

                </h1>

                <div>
                    <form noValidate onSubmit={this.onSubmit}>


                        <div className="row">
                            <div className="col-md-3 boldy">
                                <label htmlFor="file">Upload Materials:</label>
                            </div>
                            <div className="col-md-9">
                                <input
                                    onChange={this.onChange2}
                                    type="file"
                                    id="file"
                                    className="form-control"
                                    name="file"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <input
                                onChange={this.onChange}
                                type="submit"
                                className="btn btn-block text-center designedbutton"
                                style={{ alignItems: "center", marginTop: "30px" }}
                            />
                        </div>

                    </form>

                </div>



            </div>

        )
    }
}


export default addMaterial;