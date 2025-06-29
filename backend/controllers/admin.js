import TryCatch from "../middlewares/TryCatch.js"
import Course from '../models/Course.js'
import Lecture from '../models/Lecture.js'
import User from '../models/User.js'
import {rm} from 'fs'
import {promisify} from 'util'
import fs from 'fs'


export const createCourse = TryCatch(async (req,res) => {
    const {title, description, category, createdBy, duration, price} = req.body
    const image = req.file;

    await Course.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price,
    })

    res.status(201).json({
        message:"Course Created Successfully!"
    })

})

export const addLectures = TryCatch( async (req,res) => {
    const course = await Course.findById(req.params.id)

    if(!course) return res.status(404).json({
        message:"No course with this id"
    })

    const {title, description} = req.body;

    const file = req.file
    const lecture = await Lecture.create({
        title,
        description,
        video: file?.path,
        course: course._id,
    })

    res.status(201).json({
        message:"Lecture added",
        lecture
    })
})

export const deleteLecture = TryCatch ( async (req,res) => {
    const lecture = await Lecture.findById(req.params.id)

    rm(lecture.video, () => {
        console.log("Video deleted")
    })

    await lecture.deleteOne()

    ress.json({
        message: "Lecture deleted"
    })
})

const unlinkAsync = promisify(fs.unlink)

export const deleteCourse = TryCatch(  async (req,res) => {
    const course = await Course.findById(req.params.id)

    const lectures = await Lecture.find({course: course._id})
    await Promise.all(
        lectures.map( async (lecture) => {
            await unlinkAsync(lecture.video)
            console.log("Video deleted")
        })
    )

    rm(course.image, () => {
        console.log("Image deleted")
    })

    await Lecture.find({course: req.params.id}).deleteMany()

    await Course.deleteOne()

    await User.updateMany({}, {$pull:{subscription: req.params.id}})

    ress.json({
        message: "Course deleted"
    })
})

export const getAllStats = TryCatch( async (req,res) => {
    const totalCourses = (await Course.find()).length;
    const totalLectures = (await Lecture.find()).length
    const totalUsers = (await Useer.find()).length

    const stats = {
        totalCourses,
        totalLectures,
        totalLectures
    }

    res.json({
        stats,
    })
}) 