const ErrorHandler = require("../errors/errorHandler");
const Validation = require("../validations/validation");
const {Profile, User, EducationOrganisation} = require("../database");
const {extname, resolve} = require("path");
const uuid = require("uuid");

class PersonalController {
    async createAccount(req, res, next) {
        const {
            userId,
            educationOrganisationId
        } = req.query

        const {
            profileFio,
            birthday,
            gender,
            phoneNumber,
            telegramLink,
        } = req.body

        const {merchandiseImage} = req.files || {}
        const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        try {
            if (!Validation.isString(profileFio))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное ФИО!'))

            if (!Validation.isDate(birthday))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректную дату!'))

            if (!Validation.isString(gender) || gender !== 'Мужский' || gender !== 'Женский')
                return next(ErrorHandler.conflict('Пожалуйста, введите корректный пол!'))

            if (!Validation.isString(phoneNumber) || !Validation.isPhone(phoneNumber))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный телефон!'))

            if (!Validation.isString(telegramLink))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный телеграмм линк!'))

            if (merchandiseImage === undefined)
                return next(ErrorHandler.badRequest('Пожалуйста, выберите изображение!'))
            const fileExtension = extname(merchandiseImage.name).toLowerCase()
            if (!allowedImageExtensions.includes(fileExtension))
                return next(ErrorHandler.badRequest('Пожалуйста, загрузите файл в формате изображения: jpg, jpeg, png или gif!'))

            const userCandidate = await User.findByPk(userId)
            if (!userCandidate)
                return next(ErrorHandler.notFound('Данный пользователь не найден!'))

            const institute = await EducationOrganisation.findByPk(educationOrganisationId)
            if (!institute)
                return next(ErrorHandler.notFound('Данное учебное заведение не найдено!'))

            let fileName = uuid.v4() + ".jpg"
            await merchandiseImage.mv(resolve(__dirname, '..', 'static', fileName))

            const candidate = await Profile.create({
                userId,
                educationOrganisationId,
                profileFio,
                birthday,
                gender,
                phoneNumber,
                telegramLink,
                avatar: fileName
            })

            return res.json({candidate})
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`))
        }
    }

    async updateAccount(req, res, next) {
        const {
            userId,
            educationOrganisationId
        } = req.query;

        const {
            profileFio,
            birthday,
            gender,
            phoneNumber,
            telegramLink,
        } = req.body;

        const { merchandiseImage } = req.files || {};
        const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        try {
            if (!Validation.isString(profileFio))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректное ФИО!'));

            if (!Validation.isDate(birthday))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректную дату!'));

            if (!Validation.isString(gender) || (gender !== 'Мужский' && gender !== 'Женский'))
                return next(ErrorHandler.conflict('Пожалуйста, введите корректный пол!'));

            if (!Validation.isString(phoneNumber) || !Validation.isPhone(phoneNumber))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный телефон!'));

            if (!Validation.isString(telegramLink))
                return next(ErrorHandler.badRequest('Пожалуйста, введите корректный телеграмм линк!'));

            let fileName = null;
            if (merchandiseImage !== undefined) {
                const fileExtension = extname(merchandiseImage.name).toLowerCase();
                if (!allowedImageExtensions.includes(fileExtension))
                    return next(ErrorHandler.badRequest('Пожалуйста, загрузите файл в формате изображения: jpg, jpeg, png или gif!'));

                fileName = uuid.v4() + ".jpg";
                await merchandiseImage.mv(resolve(__dirname, '..', 'static', fileName));
            }

            const userCandidate = await User.findByPk(userId);
            if (!userCandidate)
                return next(ErrorHandler.notFound('Данный пользователь не найден!'));

            const institute = await EducationOrganisation.findByPk(educationOrganisationId);
            if (!institute)
                return next(ErrorHandler.notFound('Данное учебное заведение не найдено!'));

            const candidate = await Profile.update({
                profileFio,
                birthday,
                gender,
                phoneNumber,
                telegramLink,
                avatar: fileName
            }, {
                where: {
                    userId,
                    educationOrganisationId
                }
            });

            return res.json({ candidate });
        } catch (error) {
            return next(ErrorHandler.internal(`Непредвиденная ошибка: ${error}`));
        }
    }
}

module.exports = new PersonalController()