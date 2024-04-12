import React, { useEffect, useState } from 'react';
import { Table, Modal, Form, Button } from "react-bootstrap";
import deleteIcon from '../../assets/images/delete.png';
import blockIcon from '../../assets/images/block.png';
import editIcon from '../../assets/images/edit.png';
import back from '../../assets/images/back.png';
import './style.scss';
import { getUser, deleteUser, updateUser } from '../../services/http';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../services/http';
export default function Users(props) {
  const [user, setUsers] = useState([])
  const [updateUserId, setUpdateUserId] = useState('')
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const [showUser, setShowUser] = useState(false);
    const userClose = () => setShowUser(false);
    const userShow = () => setShowUser(true);

  const handleEditUser = (data) => {
    data.firstName && editFormik.setFieldValue('firstName', data.firstName)
    data.email && editFormik.setFieldValue('email', data.email)
    data.lastName && editFormik.setFieldValue('lastName', data.lastName)
    data.role && editFormik.setFieldValue('role', data.role)
    setShowModal(true);
    setUpdateUserId(data?.Id)
  };
  const getUsers = async () => {
    const records = await getUser()
    if (records.data.responseCode === 200) {
      const userData = records.data.data
      setUsers(userData)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])
  const deleteUserRecord = async (id) => {
    const result = await deleteUser(id)
    if (result.data.responseCode === 200) {
      toast.success(result.data.responseMessage);
      getUsers();
    }
  }

  // Edit User
  const EditValidate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'required';
    }
    if (!values.email) {
      errors.email = 'required';
    }
    if (!values.role) {
      errors.role = 'required';
    }
    return errors;
  };

  const editFormik = useFormik({
    initialValues: {
      email: "",
      role: "",
      firstName: "",
      lastName:""
    },
    validate: EditValidate,
    onSubmit: async (values) => {
      values.role = values.role.toLowerCase();
      const result = await updateUser(updateUserId,values)
      if (result.data.responseCode === 200) {
        toast.success("User Updated successfully");
        getUsers();
        handleModalClose();
      }
      if (result.data.responseCode === 400) {
        toast.error(result.data.responseMessage);
      }
    }
  })

  // add User Details
  const UserValidate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'required';
    }
    if (!values.email) {
      errors.email = 'required';
    }
    if (!values.role) {
      errors.role = 'required';
    }
    return errors;
  };
  const userFormik = useFormik({
    initialValues: {
      email: "",
      role: "",
      firstName: "",
      lastName: "",
    },

    validate: UserValidate,
    onSubmit: async (values) => {
      values.role = values.role.toLowerCase();
      const result = await addUser(values);
      console.error("result is", result)
      if (result.data.responseCode === 200) {
        toast.success("User added successfully");
        handleModalClose();
        getUsers()
      }
      if (result.data.responseCode === 400) {
        toast.error(result.data.responseMessage);
      }
      userFormik.resetForm();
    }
  })


  const navigate = useNavigate();

  return (
    <>

      <ToastContainer autoClose={500} />
      <div className='usersWrapper'>
        <div className='mt-2 userActionButton' >
          <Button className='backBtn' onClick={() => navigate('/dashboard')}><img src={back} alt='back' /></Button>
          <button className='btn btn-danger' onClick={userShow}>Add User</button>
        </div>
        <div className='userlistWrapper'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user?.length > 0 && user?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                    <td>
                      <div className='d-flex btns'>
                        <button><img src={editIcon} onClick={() => { handleEditUser(data) }} alt='editIcon' /></button>
                        <button><img src={blockIcon} alt='blockIcon' /></button>
                        <button onClick={() => deleteUserRecord(data.Id)}>
                          <img src={deleteIcon} alt='deleteIcon' />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>




      {/* Update user Modal  Html Start */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>



          <Form className="form-wrap" onSubmit={editFormik.handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={editFormik.handleChange}
                placeholder="Enter your first name"
                onBlur={editFormik.handleBlur}
                value={editFormik.values.firstName}
              />
              {editFormik.errors.firstName && editFormik.touched.firstName ? (
                <div className="text-danger">
                  <p className="text-danger">{editFormik.errors.firstName}</p>
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                onChange={editFormik.handleChange}
                placeholder="Enter your last name"
                onBlur={editFormik.handleBlur}
                value={editFormik.values.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={editFormik.handleChange}
                placeholder="name@example.com"
                onBlur={editFormik.handleBlur}
                value={editFormik.values.email}

              />
              {editFormik.errors.email && editFormik.touched.email ? (
                <div className="text-danger">
                  <p className="text-danger">{editFormik.errors.email}</p>
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3 mt-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
                value={editFormik.values.role}

              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>


              </Form.Select>
              {editFormik.touched.role && editFormik.errors.role ? (
                <div className="text-danger">
                  <p className="text-danger">{editFormik.errors.role}</p>
                </div>

              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
              <Button className='w-100 submitBtn' variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>

        </Modal.Body>
      </Modal>

      {/* Update user Modal Html End */}



      {/* Add User */}

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUser}
        onHide={userClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>



          <Form className="form-wrap" onSubmit={userFormik.handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={userFormik.handleChange}
                placeholder="Enter your first name"
                onBlur={userFormik.handleBlur}
                value={userFormik.values.firstName}
              />
              {userFormik.errors.firstName && userFormik.touched.firstName ? (
                <div className="text-danger">
                  <p className="text-danger">{userFormik.errors.firstName}</p>
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                onChange={userFormik.handleChange}
                placeholder="Enter your last name"
                onBlur={userFormik.handleBlur}
                value={userFormik.values.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={userFormik.handleChange}
                placeholder="name@example.com"
                onBlur={userFormik.handleBlur}
                value={userFormik.values.email}

              />
              {userFormik.errors.email && userFormik.touched.email ? (
                <div className="text-danger">
                  <p className="text-danger">{userFormik.errors.email}</p>
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="form-group" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={userFormik.handleChange}
                onBlur={userFormik.handleBlur}
                value={userFormik.values.password}

              />
              {userFormik.errors.password && userFormik.touched.password ? (
                <div className="text-danger">
                  <p className="text-danger">{userFormik.errors.password}</p>
                </div>
              ) : null}

            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select defaultValue="Choose Role"
                onChange={userFormik.handleChange}
                onBlur={userFormik.handleBlur}
                value={userFormik.values.role}

              >
                <option name="user">Select Role</option>
                <option name="user">User</option>
                <option name="admin">Admin</option>


              </Form.Select>
              {userFormik.touched.role && userFormik.errors.role ? (
                <div className="text-danger">
                  <p className="text-danger">{userFormik.errors.role}</p>
                </div>

              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
              <Button className='w-100 submitBtn' variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>



          </Form>

        </Modal.Body>
      </Modal>
    </>
  )
}
