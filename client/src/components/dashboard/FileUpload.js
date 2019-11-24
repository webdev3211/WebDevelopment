import React, { Fragment, useState } from 'react'
import axios from 'axios';
// import Image from './Image';

const FileUpload = (profilephoto) => {

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [url, setUrl] = useState(`/uploads/${profilephoto.profilephoto}`);


    console.log(profilephoto);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {

            const res = await axios.post('/api/profile/photoupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setUrl(filePath);

        } catch (err) {

            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }

        }

    }



    return (
        <Fragment>
            <div>
                {/* <Image image={uploadedFile.filePath} /> */}
                <img
                    src={url}
                    align="left"
                    height="auto"
                    width="auto"
                    style={{
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px'

                    }}
                    // style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    className="fb-image-profile thumbnail"
                    alt="Profile ppic" />

            </div>

            <form onSubmit={onSubmit}>


                <input
                    onChange={onChange}
                    type="file" />
                <input type="submit" value="Upload" />

            </form>









        </Fragment>
    )

}


export default FileUpload;