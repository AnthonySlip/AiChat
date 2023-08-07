# AiChat - https://anthonyslip.github.io/aichat/

"AiChat" - это веб-приложение, которое представляет из себя чат-бота Openai Chat GPT.
"AiChat" написан на библиотеке ReactJS (собран на Vite). Приложение строится на Openai API, для этого был написан небольшой backend (подробнее: https://github.com/AnthonySlip/aichat-server).
Также в приложении присутствует авторизация по jwt-токенам (access и refresh), кроме того я реализовал верификацию почты пользователя через backend: на указанную пользователем почту приходит код, который необходимо ввести в приложении, чтобы пользоваться чат-ботом.

В приложение используются следующие библиотеки (frontend):
- Axios (для автоматического определения access-токена в заголовках запроса)
- React-router-dom (для навигации spa-приложения)
- React-hook-form (для удобной валидации форм)
- Vite-plugin-svgr (для удобства импорта файлов .svg)
- Zustand (отвечает за состояние приложения)


"AiChat" is a web application that is an Openai Chat GPT chatbot.
"AiChat" is written in ReactJS library (built on Vite). The application is built on the Openai API, a small backend was written for this (more details: https://github.com/AnthonySlip/aichat-server).
Also, the application has authorization by jwt tokens (access and refresh), in addition, I implemented verification of the user's mail through the backend: a code is sent to the mail specified by the user, which must be entered in the application in order to use the chat bot.

The application uses the following library (frontend):
- Axios (to automatically determine the access token in the request headers)
- React-router-dom (for spa app navigation)
- React-hook-form (for convenient form validation)
- Vite-plugin-svgr (for ease of importing .svg files)
- Zustand (responsible for the state of the application)


This is a small backend for the "AiChat" application (deploy to https://vercel.com/).
The backend is written on the nodeJS platform using the expressJS framework.

- Communication with the chatbot
   Communication with the chatbot is based on the generation of responses by the Openai server. There is a small problem here: since I am using the free plan at https://vercel.com/,
   response generation should not be longer than 5 seconds, otherwise the vercel server returns a 504 error. Therefore, if Chat GPT generates a long response, then it does not come to the user.
   BUT the chatbot itself works!
- Registration
   When registering in the database, a user document is created. As well as a document with access and refresh tokens that will be overwritten / deleted when the user's authorization state changes.
- Verification
   This server generates a unique code and sends it to the mail that the user specified during registration. Feature not available at the moment: because I'm using a free plan
   plan on https://vercel.com/, the response generation should not be more than 5 seconds, otherwise the vercel server returns a 504 error. But the server needs more than 5 seconds to send a message to the mail, and so
   the function is tested and works on the local server!

This application uses the following libraries:
- cookie-parser (for working with cookies)
- cors (for implementing cors)
- crypto-js (for password hashing)
- dotenv (for creating environment variables)
- express-rate-limit (to set limits on the number of requests)
- googleapis (to implement OAuth 2, to connect the mail from which emails will be sent for verification)
- jsonwebtoken (to manage jwt tokens)
- mongodb and mongoose (for working with the MongoDB database)
- nodemailer (for generating and sending emails)
- uuid (to generate unique values)
