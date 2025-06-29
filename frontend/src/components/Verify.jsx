import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext.jsx'

const Verify = () => {
  const [otp, setotp] = useState("")
  const {btnLoading, verifyOtp} = UserData()
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    await verifyOtp(Number(otp), navigate)
  }

  return (
    <>
        <div className='flex flex-row justify-center items-center h-screen'>
        <div className='shadow-lg w-fit p-[3%]'>
          <form onSubmit={submitHandler}>
            <h3 className="font-bold text-lg text-center">Verify</h3>
          <div>
            <span>OTP</span>
            <br />
            <input type="number" placeholder="Enter OTP" className="input input-secondary" onChange={e => setotp(e.target.value)} />
          </div>
          <br />
          <button disabled={btnLoading} className="btn btn-secondary" type="submit">{btnLoading? "Please wait":"Verify"}</button>
          <br />
          </form>
        </div>
    </div>
    </>
  )
}

export default Verify
