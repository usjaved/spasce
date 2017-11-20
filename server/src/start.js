import stripePackage from 'stripe';
import { MongoClient, ObjectId } from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'
import { GraphQLObjectType, GraphQLString } from 'graphql';
import multer from 'multer';
import fs from 'fs';
import crypto from 'crypto';
import mime from 'mime';


//var bodyParser = require('body-parser'); 
var sizeOf = require('image-size');
var nodemailer = require('nodemailer');
const stripe = stripePackage('sk_test_SLC8fN89U42efy7PNINWEiGe');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mitul@dreamwarrior.com',
    pass: 'Mitul@69'
  }
});


const URL = 'http://ec2-54-245-64-1.us-west-2.compute.amazonaws.com';
const PORT = 3001;
const MONGO_URL = 'mongodb://localhost:27017/spaces';

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL)

    const Requests = db.collection('requests');
    const Categories = db.collection('categoris');
    const Comments = db.collection('comments');
    const Messages = db.collection('messages');
    const UserSocialMedias = db.collection('user_social_medias');
    const LoginSessions = db.collection('login_sessions');
    const UserPaymentInfos = db.collection('user_payment_infos');
    const RequestFlags = db.collection('request_flags');
    const RequestTransactions = db.collection('request_transactions');
    const Spacses = db.collection('spacses');
    const MessageHistories = db.collection('message_histories');
    const ContactToHosts = db.collection('contact_to_hosts');
    const SpacseOffers = db.collection('spacse_offers');
    const SpacseTours = db.collection('spacse_tours');
    const SpacseOrderBooks = db.collection('spacse_order_books');
    const Events = db.collection('events');
    const ProperyBookingDurations = db.collection('propery_booking_durations');
    const ProperyCapacities = db.collection('propery_capacities');
    const Amenities = db.collection('amenities');
    const SpacseAmenities = db.collection('spacse_amenities');
    const SpacseAvaibilities = db.collection('spacse_avaibilities');
    const SpacsePhotoGalleries = db.collection('spacse_photo_galleries');
    const PricingLayers = db.collection('pricing_layers');
    const Budgets = db.collection('budgets');
    const UserAccountSettings = db.collection('user_account_settings');
    const RequestViews = db.collection('request_views');
    const Users = db.collection('users');
    const Bookings = db.collection('bookings');
    const SpaceCategories = db.collection('space_categories');
    const RequestsSpacses = db.collection('request_spacses');
    const PaymentMethods = db.collection('payment_methods');
    const Favourites = db.collection('user_favourites');
    const Reviews = db.collection('spacse_reviews');
    const OfferMessageHistories = db.collection('offer_message');


    const typeDefs = [`
      input Upload {
        name: String!
        type: String!
        size: Int!
        path: String!
      }

      type Query {
        user(_id: String) : User
        login(email: String, password: String) : LoginSession
        request(_id: String) : Request
        category(_id: String) : Category
        comment(_id: String) : Comment
        userSocialMedia(_id: String) : UserSocialMedia
        loginSession(_id: String) : LoginSession
        userPaymentInfo(_id: String) : UserPaymentInfo
        requestFlag(_id: String) : RequestFlag
        requestTransaction(_id: String) : RequestTransaction
        spacse(_id: String) : Spacse
        messageHistory(_id: String) : MessageHistory
        contactToHost(_id: String) : ContactToHost
        spacseOffer(_id: String) : SpacseOffer
        spacseTour(_id: String) : SpacseTour
        spacseOrderBook(_id: String) : SpacseOrderBook
        event(_id: String) : Event
        properyBookingDuration(_id: String) : ProperyBookingDuration
        properyCapacity(_id: String) : ProperyCapacity
        amenity(_id: String) : Amenities
        spacseAmenity(_id: String) : SpacseAmenities
        spacseAvaibility(_id: String) : SpacseAvaibilities
        spacsePhotoGallery(_id: String) : SpacsePhotoGallery
        pricingLayer(_id: String) : PricingLayer
        budget(_id: String) : Budget
        accountsetting(_id: String) : UserAccountSetting
        requestview(_id: String) : RequestView
        bookings(_id: String): Booking
        reviews(_id: String): Reviews
        favourites(_id: String) : Favourite
        
        paymentmethod(_id: String): PaymentMethod
        offermessageHistory(_id: String) : OfferMessageHistory
        
        filterSpacses(capacity: [String], category: [String], city: String, state: String,  minPrice: Float, maxPrice: Float, minCapacity: Float, maxCapacity: Float) : [Spacse] 
        filterRequests(loginUserId : String, capacity: [String], category: [String], dates: [String], city: String, state: String, limit: Int, pageNo: Int) : [Request]
        paymentmethods: [PaymentMethod]
        favourites : [Favourite]
        bookings: [Booking]
        reviews: [Reviews]
        requestviews : [RequestView]
        users: [User]
        requests: [Request]
        userRequests(userId: String): [Request]
        categories: [Category]
        comments: [Comment]
        userSocialMedias: [UserSocialMedia]
        loginSessions: [LoginSession]
        userPaymentInfos: [UserPaymentInfo]
        requestFlags: [RequestFlag]
        requestTransactions: [RequestTransaction]
        spacses: [Spacse]
        messageHistories: [MessageHistory]
        contactToHosts: [ContactToHost]
        spacseOffers: [SpacseOffer]
        spacseTours: [SpacseTour]
        spacseOrderBooks: [SpacseOrderBook]
        events: [Event]
        properyBookingDurations: [ProperyBookingDuration]
        properyCapacities: [ProperyCapacity]
        requestFlags: [RequestFlag]
        requestTransactions: [RequestTransaction]
        spacses( limit : Int, offset: Int): [Spacse]
        amenities: [Amenities]
        spacseAmenities: [SpacseAmenities]
        spacseAvaibilities: [SpacseAvaibilities]
        spacsePhotoGalleries: [SpacsePhotoGallery]
        pricingLayers: [PricingLayer]
        budgets:[Budget]
        accountsettings : [UserAccountSetting]
        messages(userId: String) : [Message] 
        offermessageHistories: [OfferMessageHistory]
        profileMessages(userId: String) : [Message]
        getFullMessageHistoryForUser(senderId: String!, requestId: String!, receiverId: String!, time : String) : [Message]

        updateCapacity : [ProperyCapacity]
        updatePrice : [ProperyCapacity]
        getAllSpace(limit: Int, offset: Int) : [Spacse]
        getAllRequests(limit: Int, offset: Int) : [Request]
        
        getPendingSpace(userId: String) : [Spacse]
        getApprovedSpace(userId: String) : [Spacse]
        getInProcessSpace(userId: String) : [Spacse]
        spacseForEdit(_id: String, userId: String) : Spacse
        getSpacebookings(userId: String) : [Booking]
        getSimilerRequest(limit : Int, categoryId : String) : [Request]
        getBookingStatistics(userId: String) : BookingStatistics
        getStatistics(userId: String) : Statistics
        getStatisticsByMonth(userId: String): Statistics
        getStatisticsByLastMonth(userId: String): Statistics
        getStatisticsByYear(userId: String):Statistics 
        getUpcomingBookings(userId: String) : [Booking]
        getTopRatedSpaces: [Spacse]
        searchSpaceByTitle(keyWord : String) : [Spacse]
        similerSpasce(categoryId : String) : [Spacse]
        getTopEventSpaces: [Spacse]
        getTopCreativeSpaces: [Spacse] 
        latestRequests : [Request] 
        getSendSpacseOffers(userId: String!) : [SpacseOffer]
        getReceiveSpacseOffers(userId: String!): [SpacseOffer]

        submittedReviews(userId: String!): [Reviews]
        receivedReview(userId: String!): [Reviews]
        clearReadCount(userId: String, requestId: String) : Response
        getOfferMessages(userId: String!): [OfferMessageHistory]
        getFullOfferMessageHistoryForUser(senderId: String! ,receiverId: String!, requestedId: String! ,time: String): [OfferMessageHistory]
      }
    
      type Favourite{
        _id: String
        userId: String
        spacseId: String
        user : User
        spacse: Spacse
       }

      type Reviews {
        _id: String
        userId: String
        spacseId: String
        bookingId : String
        comment : String
        rate : Float
        user : User
        createdAt: String
        spacse: Spacse
        booking: Booking
        
      } 

      type PaymentMethod{
        _id: String
        userId: String
        accounttype: String
        firstName: String
        lastName: String
        routingNo: String
        accountNo: String
        user: User
      }

      type User {
        _id: String
        firstName: String
        lastName: String
        email: String
        dateOfBirth: String
        password: String
        status: String
        mobile: String
        about: String
        profilePic : String
        createdAt: Float
        requests: [Request]
        comments: [Comment]
        socialMedias: [UserSocialMedia]
        loginSessions: [LoginSession]
        userPaymentInfo: UserPaymentInfo
        requestFlags: [RequestFlag]
        requestTransactions: [RequestTransaction]
        spacses: [Spacse]
        messageHistories: [MessageHistory]
        contactToHosts: [ContactToHost]
        spacseOffers: [SpacseOffer]
        spacseTours: [SpacseTour]
        orders: [SpacseOrderBook]
        bookings: [Booking]
        reviews: [Reviews]
        events: [Event]	
        accountsetting : UserAccountSetting
        paymentmethods : [PaymentMethod]
        favourites : [Favourite]
       }

      type UserAccountSetting{
        _id: String
        userId: String
        smsNotification: String
        generalNotification: String
        reservationNotification: String
        accountNotification: String
        user: User
      }

       type UserSocialMedia{
        _id: String
        userId: String
        socialMediaName: String
        socialMediaId: String
        token: String
        user: User
      }

      type LoginSession{
        _id: String
        userId: String
        session: String
        user: User
      }
      type Budget{
        _id: String
        title: String
        minimum: String
        maximum: String
     }
     type SpaceCategories{
      _id: String
      spacseId: String
      categoryId: String
      spacse: Spacse
      category: Category
     }

     type UserPaymentInfo{
        _id: String
        paymentType: String
        userId: String
        email: String
        paypalId: String
        spacseId: String
        createdAt: String
        updatedAt: String
        status: String
        user: User
        bankInfo: String
        routingNo: String
        accounttype: String
        accountNo: String
     }
  
      type ProperyCapacity{
        _id: String
        title: String
        minimumValue: Float
        maximumValue: Float
        status: String
        request: [Request]
        spacses: [Spacse]

      }

      type ProperyBookingDuration{ 
        _id: String
        duration: String
      }

      type Category {
        _id: String
        title: String
        status: String
        requests: [Request]
        spacses: [Spacse]
      }
      
      type RequestView{
        _id: String
        requestId : String
        userId: String
        view : String
      }
       type Request {
        _id: String
        userId : String 
        startDate : String
        endDate : String
        startDateInSec : Float
        endDateInSec : Float
        address : String
        createdAt: String
        updatedAt: String
        city : String
        state : String
        country : String
        otherCategoryTitle : String
        categoryId : String
        capacityId : String
        budgetId : String
        description : String
        timeDuration : String
        status : String
        category: Category
        capacity: ProperyCapacity
        user: User
        budget: Budget
        unReadMessageCount: Int
        comments: [Comment]
        messages(loginUserId: String): [Message]
        flags: [RequestFlag]
        requestTransactions: [RequestTransaction]
        spaces(loginUserId: String): [RequestsSpacse]
      }

      type RequestFlag{
        _id: String
        flagId: String
        reasons: String
        userId: String
        type: String
        createdAt: String
        user: User
        request: Request
      }

      type Comment {
        _id: String
        userId: String
        requestId: String
        comment: String
        photoUrl: String
        commentType: String
        transactionId: String
        repliedToCommentId: String
        createdAt: String
        request: Request
        spacse: Spacse
        user: User
        replies: [Comment]
        requestTransaction: RequestTransaction
      }

      type Message {
        _id: String
        senderId: String
        receiverId: String
        requestId: String
        spacseId: String
        comment: String
        photoUrl: String
        messageType: String
        transactionId: String
        tourId : String
        repliedToMessageId: String
        isReaded : Boolean
        createdAt: String
        request: Request
        spacse : Spacse
        sender: User
        receiver: User
        replies: [Message]
        requestTransaction: [RequestTransaction]
        tour: [SpacseTour]
      }

      type RequestTransaction	{
        _id: String
        userId: String
        requestId: String
        amount: String
        reason: String
        transactionType: String
        transactionInfo: String
        status: String
        requestTransactionId: String
        createdAt: String
        updatedAt: String
        request: Request
        user: User
        message: Message
      }
      type RequestsSpacse{
        _id: String
        userId: String
        requestId : String
        spacseId : String
        spaceLink : String
        description : String
        createdAt : Float
        user: User
        request: Request
        spacse : Spacse
      }
      type Spacse{
        _id: String
        userId: String
        categoryId: String
        capacityId: String
        numberOfRooms: String
        numberOfRestRooms: String
        squareFootArea: String
        address: String
        city: String
        state: String
        country: String  
        latitude: String
        longitude: String
        title: String
        subTitle: String
        description: String
        coverPictire: String
        status: String
        securityDeposit: String
        additionalFees: String
        TotalReview: Float
        AvgReview: Float
        isPrivate : String
        createdAt: Float
        updatedAt: Float    
        category: Category
        capacity: ProperyCapacity
        user: User
        userPaymentInfo: UserPaymentInfo
        comments(limit: Int, offset: Int): [Comment]
        flags(limit: Int, offset: Int): [RequestFlag] 
        spacseamenities(limit: Int, offset: Int): [SpacseAmenities]
        avaibilities(limit: Int, offset: Int): [SpacseAvaibilities]
        spacsePhotoGallery(limit: Int, offset: Int): [SpacsePhotoGallery]
        pricingLayer(limit: Int, offset: Int): [PricingLayer]
        messageHistories(limit: Int, offset: Int): [MessageHistory]
        spacseOffers(limit: Int, offset: Int): [SpacseOffer]
        spacseTours(limit: Int, offset: Int): [SpacseTour]
        orders(limit: Int, offset: Int): [SpacseOrderBook]
        bookings(limit:Int, offset: Int):[Booking]
        reviews(limit:Int,offset: Int):[Reviews]
        favourites(userId : String): [Favourite]
        spaceCategories :[SpaceCategories]
      }

      type Amenities	 {
        _id: String
        title: String
        status: String
        spacse: [SpacseAmenities]
      }

      type SpacseAmenities	 {
        _id: String
        amenitiesId: String
        spacseId: String
        amenities: Amenities
        spacse: Spacse
      }  

      type SpacseAvaibilities	{
        _id: String
        spacseId: String
        days: String
        startTime: String
        endTime: String
        spacse: Spacse
      }

      type SpacsePhotoGallery	{
        _id: String
        propertyId: String
        imageUrl: String
        status: String
        position: String
        spacse: Spacse
      }

      input PricingLayerInput{
          spacseId: String
          timeFrame: String
          timeFrameType: String
          rate: Float
          status: String
      }

      input AvaibilityTimeInput{
        days : String
        startTime: String
        endTime: String
      }

      type PricingLayer{
          _id: String
          spacseId: String
          timeFrame: String
          timeFrameType: String
          rate: Float
          status: String
          spacse: Spacse
      }
      
      type MessageHistory{
        _id: String
        senderId: String
        receiverId: String
        spacseId: String
        status: String
        message: String
        createdAt: String
        messageId: String
        spacse: Spacse
        sender: User
        reciever: User
        spacse: Spacse
        replies: [MessageHistory]
      }
      
      type OfferMessageHistory{
        _id: String
        senderId: String
        receiverId: String
        spacseId:String
        message: String
        createdAt: String
        requestedId: String
        messageId: String
        spacse: Spacse
        sender: User
        receiver: User
        spacseoffers(_id: String): SpacseOffer
        createdAt : String
        replies: [OfferMessageHistory]
       }

      type ContactToHost{
        _id: String
        spacseId: String
        userId: String
        startDate: String 
        endDate: String
        isDateFlexible: String
        comment: String
        createdAt: String
        status: String
        user: User
        spacse: Spacse
      }

      type SpacseOffer{
        _id: String
        userId: String
        senderId: String
        receiverId: String
        spacseId: String
        startDate: String
        endDate: String
        hoursNeeded: String
        offerPrice: String
        status: String
        createdAt: String
        updatedAt: String
        sender: User
        receiver: User
        user: User
        spacse: Spacse
      }
      
      type SpacseTour{
        _id: String
        userId: String
        propertyId: String
        propertyType: String
        tourDate: String
        startTime: String
        endTime: String
        createdAt: String
        updatedAt: String
        status: String
        user: User
        request: Request
        spacse: Spacse
      }
      type SpacseOrderBook {
        _id: String
        spacseId: String
        startDate: String
        endDate: String
        pricingLayerId: String
        status: String
        startTime: String
        endTime: String
        paymentStatus: String
        createdAt: String
        updatedAt: String
        user: User
        spacse: Spacse
        pricingLayer: PricingLayer
      }

      type SpaceList{
        totalRecord : Int
        spaces: [Spacse]
      }
      type Response{
        code: String
        message: String
        id: String
      }  

      type Statistics{
        code: String
        message: String
        totalBookings : Int
        totalRevenue : Float
        avgRevenue: Float
      }
      type BookingStatistics{
        code: String
        message: String
        totalRecords : Int
        totalInquiry : Int
        totalTours : Int
        totalOffers : Int
      }
      
      type Event{
          _id: String
          title: String
          startDate: String
          endDate: String
          createdAt: String
          userId: String
          user: User
      }
      type Booking{
        _id: String
        userId : String
        spaceId : String
        amount : Float
        reason : String
        token : String
        paymentId : String
        startDate : String
        endDate : String
        timeFrame : String
        timeFrameType : String
        transactionId : String
        status : String
        paymentStatus: String
        rate : Float
        createdAt: Float
        updateAt: Float
        user: User
        spacse: Spacse
      }


      type Mutation {
        createUser( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String): Response
        createUserSocialMedia(userId: String, socialMediaName: String, socialMediaId: String, token: String ): UserSocialMedia
        createLoginSession(userId: String, session: String ): LoginSession
        createUserPaymentInfo(paymentType: String ,spacseId: String, userId: String, paypalId: String, bankInfo: String, routingNo: String, accounttype: String, accountNo: String, createdAt: String, updatedAt: String, status: String,email: String):  UserPaymentInfo
        createProperyCapacity(title: String, minimumValue: Float, maximumValue: Float, status: String ): ProperyCapacity
        createProperyBookingDuration( duration: String ): ProperyBookingDuration
        createCategory( title: String, status: String ): Category
        createRequest(userId: String, startDate: String, endDate: String, address: String, city: String, state: String, country: String, otherCategoryTitle: String, categoryId: String, capacityId: String, budgetId: String, description: String, timeDuration: String, status: String): Request
        createRequestFlag(flagId: String, reasons: String, userId: String,type: String): RequestFlag
        createComment(userId: String, requestId: String, comment: String, photoUrl: String, commentType: String, transactionId: String, repliedToCommentId: String ): Comment
        createMessage(senderId: String, receiverId: String, spacseId: String tourId: String, requestId: String, comment: String, photoUrl: String, messageType: String, transactionId: String, repliedToMessageId: String, transactionId: String): Message
        createRequestTransaction (userId: String, requestId: String, amount: String, reason: String, transactionType: String, transactionInfo: String, status: String, requestTransactionId: String ): RequestTransaction
        createSpacse(_id : String, userId: String, categoryId: String, capacityId: String, numberOfRooms: String, numberOfRestRooms: String, squareFootArea: String, address: String, city: String, state: String, country: String, latitude: String, longitude: String, title: String, subTitle: String, description: String, coverPictire: String, status: String, securityDeposit: String, additionalFees: String, createdAt: String, updatedAt: String, aminities: [String], avaibilities : [AvaibilityTimeInput]): Spacse
        createAmenities	(title: String!, status: String!): Amenities
        createSpacseAmenities (amenitiesIds: [String], spacseId: String): [SpacseAmenities]
        createSpacseAvaibilities (spacseId: String, days: String, startTime: String, endTime: String ): SpacseAvaibilities
        createSpacsePhotoGallery (propertyId: String, imageUrl: String, status: String, position: String ): SpacsePhotoGallery
        createPricingLayer(spacseId: String, timeFrame: String, timeFrameType: String, rate: Float, status: String ): PricingLayer
        createMessageHistory(senderId: String, receiverId: String, spacseId: String, message: String, messageId: String): MessageHistory
        createContactToHost( spacseId: String, userId: String, startDate: String, endDate: String, isDateFlexible: String, comment: String, createdAt: String, status: String ): ContactToHost
        createSpacseOffer(senderId: String, receiverId: String, spacseId: String, startDate: String, endDate: String, hoursNeeded: String, offerPrice: String, status: String,createdAt: String ): SpacseOffer
        createSpacseTour(userId: String, propertyId: String, propertyType: String tourDate: String, startTime: String, endTime: String, status: String): SpacseTour
        createSpacseOrderBook(spacseId: String, startDate: String, endDate: String, pricingLayerId: String, status: String, startTime: String, endTime: String, paymentStatus: String): SpacseOrderBook
        createEvent(title: String, startDate: String, endDate: String,userId: String): Event     
        createBudget( title: String, minimum: String, maximum: String) : Budget
        createUserAccountSetting(userId: String, smsNotification: String, generalNotification: String, reservationNotification: String, accountNotification: String) : Response
        createPaymentMethod(userId: String, accounttype: String, firstName: String ,lastName: String ,routingNo: String,accountNo: String) : PaymentMethod

        createOfferMessage(senderId: String, receiverId: String, spacseId: String , requestedId: String, message: String, messageType: String): OfferMessageHistory
        
        updatePrice(pricing: [PricingLayerInput]) :Response
        updateSecurityDeposit(spacseId: String, securityDeposit: String) :Response
        updateAdditionalFees(spacseId: String, additionalFees: String) :Response
        uploadImages(spacseId: String, coverPic : String , photoGellary: [String]) :Response
        updateUser(_id: String, firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, mobile: String, about: String, profilePic : String  ): Response
        updatePassword(_id: String, oldpassword: String, newpassword: String, confirmpassword: String): Response
        updateRequest(_id: String, userId : String, startDate : String, endDate : String, address : String, city : String, state : String, country : String, otherCategoryTitle : String, categoryId : String, capacityId : String, budgetId : String, description : String, timeDuration : String, createdAt: String, status : String): Response
        updateRequestCounter(requestId: String,userId: String) : Response
        doPayment(userId: String, token: String, requestId: String, amount: String, reason: String, transactionType: String, transactionInfo: String, status: String, requestTransactionId: String) : Response
        submitForApproval(spacseId: String, status: String) : Response


        loginWithFacebook( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, fbid: String): LoginSession
        loginWithGoogle( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, gid: String, profilePic: String): LoginSession
        signUpLinkedIN( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, likedInId: String, profilePic: String): LoginSession


        createSpaceStep1(spacseId: String, userId: String, categoryId: [String]) : Response
        createSpaceStep2(spacseId: String, userId: String, capacityId: String, numberOfRooms: String, numberOfRestRooms: String, squareFootArea: String) : Response
        createSpaceStep3(spacseId: String, userId: String, aminities: [String]) : Response
        createSpaceStep4(spacseId: String, userId: String, address: String, state: String, city: String, country: String, latitude: String, longitude: String) : Response
        createSpaceStep5(spacseId: String, userId: String, avaibilities: [AvaibilityTimeInput]) : Response
        createSpaceStep6(spacseId: String, userId: String, title :String, subTitle: String, description: String) : Response
        createSpaceStep7(spacseId: String, userId: String, categoryId: String) : Response
        createSpaceStep8(spacseId: String, userId: String, categoryId: String) : Response
        createFavourite(spacseId: String, userId: String) : Response
        setPrivate(spacseId: String, isPrivate: String) : Response

        bookSpacse(userId : String, spaceId : String, amount : Float, reason : String, token : String, startDate : String, endDate : String, timeFrame : String, timeFrameType : String, rate : Float): Response

        updateStatus(spacseIds: [String], status: String) : Response
        updateRequestStatus(requestIds: [String], status: String) : Response
        
        updateBookingStatus(id: String, status: String) : Response

        submitSpacesForRequest(requestId: String, userId: String, spacsesId: [String], spaceLink : String, description : String) : Response
        createSpacseReview(userId: String, spacseId: String, bookingId : String,comment : String, rate : Float) : Response

      }

      schema {
        query: Query
        mutation: Mutation
      }
    `];

    /* updateUser():User
        updateRequest():Request
        updateCategories():Categories
        updateComment():Comment
        updateUserSocialMedia():UserSocialMedia
        updateLoginSession():LoginSession
        updateUserPaymentInfo():UserPaymentInfo
        updateRequestFlag():RequestFlag
        updateRequestTransaction():RequestTransaction
        updateSpacse():Spacse
        updateMessageHistory():MessageHistory
        updateContactToHost():ContactToHost
        updateSpacseOffer():SpacseOffer
        updateSpacseTour():SpacseTour
        updateSpacseOrderBook():SpacseOrderBook
        updateEvent():Event
        updateProperyBookingDuration():ProperyBookingDuration
        updateProperyCapacity():ProperyCapacity
        updateRequestFlag():RequestFlag
        updateRequestTransaction():RequestTransaction
        updateSpacse():Spacse
        updateAmenity():Amenity
        updateSpacseAmenity():SpacseAmenity
        updateSpacseAvaibility():SpacseAvaibility
        updatePricingLayer():PricingLayer
        updateSpacsePhotoGallery():SpacsePhotoGallery */
    const resolvers = {
      Query: {

        similerSpasce: async (root, { categoryId }) => {
          var filter = {};
          filter.status = "Active";
          filter.categoryId = categoryId;
          return (await Spacses.find(filter).sort({ "createdAt": - 1 }).limit(10).toArray()).map(prepare);
        },
        searchSpaceByTitle: async (root, { keyWord }) => {
          var filter = {};
          filter.status = "Active";
          filter.title = new RegExp(keyWord, 'i');
          return (await Spacses.find(filter).sort({ "createdAt": - 1 }).limit(10).toArray()).map(prepare);
        },
        getTopRatedSpaces: async (root) => {
          var filter = {};
          filter.status = "Active";
          return (await Spacses.find(filter).sort({ "createdAt": - 1 }).limit(10).toArray()).map(prepare);
        },
        getTopEventSpaces: async (root) => {
          var categoryFilter = { title: "Event" };
          var category = prepare(await Categories.findOne(categoryFilter));

          var filter = {};
          filter.status = "Active";
          filter.categoryId = category._id;
          return (await Spacses.find(filter).sort({ "createdAt": - 1 }).limit(10).toArray()).map(prepare);
        },
        getTopCreativeSpaces: async (root) => {
          var categoryFilter = { title: "Creative" };
          var category = prepare(await Categories.findOne(categoryFilter));

          var filter = {};
          filter.status = "Active";
          filter.categoryId = category._id;
          return (await Spacses.find(filter).sort({ "createdAt": - 1 }).limit(10).toArray()).map(prepare);
        },
        latestRequests: async (root) => {
          var filter = {};
          return (await Request.find(filter).sort({ "createdAt": - 1 }).limit(10).toArray()).map(prepare)
        },

        getAllSpace: async (root, { limit, offset }) => {
          var filter = {};
          filter.status = { $in: ["Pending", "Active", "Rejected"] };
          return (await Spacses.find(filter).skip(offset).limit(limit).toArray()).map(prepare)
        },
        getAllRequests: async (root, { limit, offset }) => {
          var filter = {};
          filter.status = { $in: ["Pending", "Active", "Rejected"] };
          return (await Requests.find(filter).skip(offset).limit(limit).toArray()).map(prepare)
        },
        getSimilerRequest: async (root, { limit, categoryId }) => {

          var filter = {};
          filter.categoryId = categoryId;
          return (await Requests.find(filter).skip(0).limit(limit).toArray()).map(prepare);
        },
        getSpacebookings: async (root, { userId }) => {

          var filter = {};
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          filter = {};
          filter.spaceId = { $in: spaceIds };
          return (await Bookings.find(filter).toArray()).map(prepare);
        },
        getPendingSpace: async (root, { userId }) => {
          var filter = {};
          filter.status = "Pending";
          filter.userId = userId;
          return (await Spacses.find(filter).toArray()).map(prepare)
        },
        getApprovedSpace: async (root, { userId }) => {
          var filter = {};
          filter.status = "Active";
          filter.userId = userId;
          return (await Spacses.find(filter).toArray()).map(prepare)
        },
        getInProcessSpace: async (root, { userId }) => {
          var filter = {};
          filter.status = "In Process";
          filter.userId = userId;
          return (await Spacses.find(filter).toArray()).map(prepare)
        },
        spacseForEdit: async (root, { _id, userId }) => {
          var filter = {};
          filter._id = ObjectId(_id);
          filter.userId = userId;
          return prepare(await Spacses.findOne(filter))
        },

        updateCapacity: async (root, { email, password }) => {
          var capacity = (await ProperyCapacities.find({}).skip(0).limit(50).toArray());

          for (var i = 0; i < capacity.length; i++) {
            capacity[i].minimumValue = Number(capacity[i].minimumValue);
            capacity[i].maximumValue = Number(capacity[i].maximumValue);
            await ProperyCapacities.update({ _id: ObjectId(capacity[i]._id) }, capacity[i]);
          }

          var spacses = (await PricingLayers.find({}).skip(0).toArray());

          for (var i = 0; i < spacses.length; i++) {
            spacses[i].rate = Number(spacses[i].rate);
            await PricingLayers.update({ _id: ObjectId(spacses[i]._id) }, spacses[i]);
          }

          return capacity;
        },
        login: async (root, { email, password }) => {
          console.log(email);
          console.log(password);

          let user = prepare(await Users.findOne({ "email": email, "password": password }));
          if (user) {
            console.log(user);
            let LSdata = { 'userId': user._id, session: new Date().toISOString() };
            const res = await LoginSessions.insert(LSdata)
            console.log(res);
            return res.ops[0];
          }
          return "";
        },

        user: async (root, { _id }) => {
          return prepare(await Users.findOne(ObjectId(_id)))
        },

        getBookingStatistics: async (root, { userId }) => {

          var filter = {};
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          filter = {};
          filter.spaceId = { $in: spaceIds };
          var bookings = (await Bookings.find(filter).toArray()).map(prepare);
          var response = {};
          response.code = 200;
          response.totalRecords = bookings.length;

          filter = {};
          filter.propertyId = { $in: spaceIds };
          var tours = (await SpacseTours.find(filter).toArray()).map(prepare);
          response.totalTours = tours.length;

          filter = {};
          filter.spacseId = { $in: spaceIds };
          var totalOffers = (await SpacseOffers.find(filter).toArray()).map(prepare);
          response.totalOffers = totalOffers.length;
          return response;
        },
        getStatistics: async (root, { userId }) => {

          var filter = {};
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          filter = {};
          filter.spaceId = { $in: spaceIds };
          filter.paymentStatus = "Paid";
          var bookings = (await Bookings.find(filter).toArray()).map(prepare);
          if (bookings.length > 0) {
            var total_revenue = 0;
            for (var i = 0; i < bookings.length; i++) {
              total_revenue = total_revenue + bookings[i].amount;
            }
            var avg_revenue = 0;
            avg_revenue = Math.round(total_revenue / bookings.length)

            return { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue };
          }
          else {
            return { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 };
          }
        },
        getStatisticsByMonth: async (root, { userId }) => {

          var currentDate = new Date();
          var preMonthDate = new Date();
          preMonthDate.setDate(1);

          var filter = {};
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          filter = {};
          filter = {
            '$and': [
              { "createdAt": { "$gte": preMonthDate.getTime() } },
              { "createdAt": { "$lte": currentDate.getTime() } },
              { "spaceId": { "$in": spaceIds } },
              { "paymentStatus": { "$eq": "Paid" } }
            ]
          };

          var bookings = (await Bookings.find(filter).toArray()).map(prepare);
          console.log(bookings);
          if (bookings.length > 0) {
            var total_revenue = 0;

            for (var i = 0; i < bookings.length; i++) {
              total_revenue = total_revenue + bookings[i].amount;
            }
            var avg_revenue = 0;
            avg_revenue = Math.round(total_revenue / bookings.length);

            return { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue };
          }
          else {
            return { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 };
          }
        },

        getStatisticsByLastMonth: async (root, { userId }) => {

          var currentDate = new Date();
          var preMonthDate = new Date();
          preMonthDate.setMonth(preMonthDate.getMonth() - 1);
          preMonthDate.setDate(1);
          currentDate.setDate(1);

          var filter = {};
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          console.log(spaces);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          filter = {};

          filter = {
            '$and': [
              { "createdAt": { "$gte": preMonthDate.getTime() } },
              { "createdAt": { "$lte": currentDate.getTime() } },
              { "spaceId": { "$in": spaceIds } },
              { "paymentStatus": { "$eq": "Paid" } }

            ]
          };
          var bookings = (await Bookings.find(filter).toArray()).map(prepare);
          console.log(bookings);
          if (bookings.length > 0) {
            var total_revenue = 0;

            for (var i = 0; i < bookings.length; i++) {
              total_revenue = total_revenue + bookings[i].amount;
            }
            var avg_revenue = 0;
            avg_revenue = Math.round(total_revenue / bookings.length);

            return { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue };
          }
          else {
            return { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 };
          }
        },
        getStatisticsByYear: async (root, { userId }) => {

          var currentDate = new Date();
          var preMonthDate = new Date();
          preMonthDate.setDate(1);
          preMonthDate.setMonth(0);
          var filter = {};
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          filter = {};
          // filter.spaceId = { $in: spaceIds };
          // filter.createdAt = { $lte: d.getTime() , $gte: m.getTime() }
          filter = {
            '$and': [
              { "createdAt": { "$gte": preMonthDate.getTime() } },
              { "createdAt": { "$lte": currentDate.getTime() } },
              { "spaceId": { "$in": spaceIds } },
              { "paymentStatus": { "$eq": "Paid" } }

            ]
          };

          var bookings = (await Bookings.find(filter).toArray()).map(prepare);
          console.log(bookings);
          if (bookings.length > 0) {
            var total_revenue = 0;

            for (var i = 0; i < bookings.length; i++) {
              total_revenue = total_revenue + bookings[i].amount;
            }
            var avg_revenue = 0;
            avg_revenue = Math.round(total_revenue / bookings.length);

            return { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue };
          }
          else {
            return { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 };
          }
        },
        getUpcomingBookings: async (root, { userId }) => {

          var curr = new Date();
          var month = curr.getMonth() + 1;
          var year = curr.getFullYear();

          var c1 = year + "-" + month + "-" + curr.getDate()
          console.log("c1:" + c1);
          var LastDay = new Date(year, month, 0);
          console.log("LastDay" + LastDay);
          var c2 = year + "-" + month + "-" + LastDay.getDate();
          console.log("c2:" + c2);

          var filter = {};
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          filter = {};
          /*   filter = {
               '$and': [
                 { "startDate": { "$gte": c1.toString() } },
                 { "startDate": { "$lte": c2.toString() } },
                 { "spaceId": { "$in": spaceIds } }
               ]
             }; */

          var bookings = (await Bookings.find(filter).toArray()).map(prepare);
          if (bookings.length > 0) { console.log(bookings); }
          else {
            console.log("There is no any upcoming bookings");
          }

        },
        getSendSpacseOffers: async (root, { userId }) => {
          var filter = {}
          filter = {
            '$or': [
              { "receiverId": { "$ne": userId } },
              { "senderId": { "$eq": userId } },
            ]
          }
          var sending_offer = (await SpacseOffers.find(filter).toArray()).map(prepare)
          return (await SpacseOffers.find(filter).toArray()).map(prepare)
        },

        getReceiveSpacseOffers: async (root, { userId }) => {
          var filter = {}
          filter = {
            '$or': [
              { "receiverId": { "$eq": userId } },
              { "senderId": { "$ne": userId } },
            ]
          }
          var receiving_offer = (await SpacseOffers.find(filter).toArray()).map(prepare)
          console.log("sending_offer" + receiving_offer)
          return (await SpacseOffers.find(filter).toArray()).map(prepare)

        },
        submittedReviews: async (root, { userId }) => {
          var filter = {}
          filter.userId = userId;
          return (await Reviews.find(filter).toArray()).map(prepare);

        },
        receivedReview: async (root, { userId }) => {
          var filter = {}
          filter.userId = userId;
          var spaces = (await Spacses.find(filter).toArray()).map(prepare);
          var spaceIds = [];
          for (var i = 0; i < spaces.length; i++) {
            spaceIds.push(spaces[i]._id)
          }
          var spaceFilter = { "spaceId": { "$in": spaceIds } };
          return  (await Reviews.find(spaceFilter).toArray()).map(prepare)
        },

        clearReadCount: async (root, { userId, requestId }) => {
          var filter = {};
          filter.receiverId = userId;
          filter.requestId = requestId;
          (await Messages.update(filter, { $set: { isReaded: true } }, { multi: true }));
          return { "code": 200, }
        },

        getReceiveSpacseOffers: async (root, { userId }) => {
          var filter = {}
          filter = {
            '$or': [
              { "receiverId": { "$eq": userId } },
              { "senderId": { "$ne": userId } },
            ]
          }
          var receiving_offer = (await SpacseOffers.find(filter).toArray()).map(prepare)
          return (await SpacseOffers.find(filter).toArray()).map(prepare)

        },
        getOfferMessages: async (root, { userId }) => {
          var res = [];
          var condi = { "$or": [{ "receiverId": userId }] };

          await (OfferMessageHistories.group(["senderId", "requestedId"], condi, { "count": 0 }, "function (obj, prev) { prev.count++; }").then(function (results) {
            res = results;
          }));
          var k = 0;
          var userIds = [];
          var response = [];
          var requestedIds = [];
          for (var i = 0; i < res.length; i++) {
            var filter = {};
            filter.requestedId = res[i].requestedId;
            filter.$or = [{ senderId: res[i].senderId }, { receiverId: res[i].senderId }];
            var obj = (await OfferMessageHistories.find(filter).sort({ "createdAt": 1 }).limit(1).toArray()).map(prepare);
            res[i] = obj[0];
          }
          return res;
        },

        getFullOfferMessageHistoryForUser: async (root, { senderId, receiverId, requestedId }) => {

          var request = prepare(await SpacseOffers.findOne(ObjectId(requestedId)));
          var offerId = request._id
          if (offerId) {
            var filter = { "requestedId": offerId };
            if (offerId.senderId == senderId) {
              filter.$or = [{ "senderId": receiverId }, { "receiverId": receiverId }];
            } else {
              filter.$or = [{ "senderId": senderId }, { "receiverId": senderId }];
            }
            return (await OfferMessageHistories.find(filter).sort({ "createdAt": 1 }).limit(100).toArray()).map(prepare);
          }
          return [];

        },



        favourites: async (root, { }) => {
          return (await Favourites.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        favourites: async (root, { _id }) => {
          return prepare(await Favourites.findOne(ObjectId(_id)))
        },



        messages: async (root, { userId }) => {
          console.log(userId);
          return (await Messages.find({}).skip(0).limit(50).toArray()).map(prepare)
        },



        users: async (root, { }) => {
          return (await Users.find({}).skip(0).limit(50).toArray()).map(prepare)
        },
        request: async (root, { _id }) => {
          return prepare(await Requests.findOne(ObjectId(_id)))
        },

        requests: async (root, { limit, offset }) => {
          var defaultLimit = 20;
          if (limit) {
            defaultLimit = limit;
          }
          var filter = {};
          filter.status = "Active"
          return (await Requests.find(filter).sort({ "createdAt": -1 }).skip(0).limit(defaultLimit).toArray()).map(prepare)
        },

        userRequests: async (root, { userId }) => {
          var requests = (await Requests.find({ userId: userId }).sort({ "createdAt": -1 }).skip(0).limit(50).toArray()).map(prepare)
          for (var i = 0; i < requests.length; i++) {
            var messageFilter = {};
            messageFilter.receiverId = userId;
            messageFilter.isReaded = false;
            messageFilter.requestId = requests[i]._id;
            var messages = (await Messages.find(messageFilter).toArray());
            requests[i].unReadMessageCount = messages.length;
          }
          console.log(requests);
          return requests;
        },

        comment: async (root, { _id }) => {
          return prepare(await Comments.findOne(ObjectId(_id)))
        },
        category: async (root, { _id }) => {
          return prepare(await Categories.findOne(ObjectId(_id)))
        },
        categories: async (root, { }) => {
          return (await Categories.find({}).skip(0).limit(50).toArray()).map(prepare)
        },
        userSocialMedia: async (root, { _id }) => {
          return prepare(await UserSocialMedias.findOne(ObjectId(_id)))
        },
        userSocialMedias: async (root, { }) => {
          return (await UserSocialMedias.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        loginSession: async (root, { _id }) => {
          return prepare(await LoginSessions.findOne(ObjectId(_id)))
        },
        loginSessions: async (root, { }) => {
          return (await LoginSessions.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        userPaymentInfo: async (root, { _id }) => {
          return prepare(await UserPaymentInfos.findOne(ObjectId(_id)))
        },
        userPaymentInfos: async (root, { }) => {
          return (await UserPaymentInfos.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        paymentmethod: async (root, { _id }) => {
          return prepare(await PaymentMethods.findOne(ObjectId(_id)))
        },
        paymentmethods: async (root, { }) => {
          return prepare(await PaymentMethods.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        requestFlag: async (root, { _id }) => {
          return prepare(await RequestFlags.findOne(ObjectId(_id)))
        },
        requestFlags: async (root, { }) => {
          return (await RequestFlags.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        requestview: async (root, { _id }) => {
          return prepare(await RequestViews.findOne(ObjectId(_id)))
        },

        requestviews: async (root, { }) => {
          return (await RequestViews.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        requestTransaction: async (root, { _id }) => {
          return prepare(await RequestTransactions.findOne(ObjectId(_id)))
        },
        requestTransactions: async (root, { }) => {
          return (await RequestTransactions.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacse: async (root, { _id }) => {
          return prepare(await Spacses.findOne(ObjectId(_id)))
        },
        spacses: async (root, { limit, offset }) => {
          var defaultLimit = 20;
          if (limit) {
            defaultLimit = limit;
          }
          return (await Spacses.find({ "status": "Active" }).skip(0).limit(defaultLimit).toArray()).map(prepare)
          //return (await Spacses.find().skip(0).limit(defaultLimit).toArray()).map(prepare)
        },

        offermessageHistory: async (root, { _id }) => {
          return prepare(await OfferMessageHistories.findOne(ObjectId(_id)))
        },
        offermessageHistories: async (root, { }) => {
          return (await OfferMessageHistories.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        messageHistory: async (root, { _id }) => {
          return prepare(await MessageHistories.findOne(ObjectId(_id)))
        },
        messageHistories: async (root, { }) => {
          return (await MessageHistories.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        contactToHost: async (root, { _id }) => {
          return prepare(await ContactToHosts.findOne(ObjectId(_id)))
        },
        contactToHosts: async (root, { }) => {
          return (await ContactToHosts.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacseOffer: async (root, { _id }) => {
          return prepare(await SpacseOffers.findOne(ObjectId(_id)))
        },
        spacseOffers: async (root, { }) => {
          return (await SpacseOffers.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacseTour: async (root, { _id }) => {
          return prepare(await SpacseTours.findOne(ObjectId(_id)))
        },
        spacseTours: async (root, { }) => {
          return (await SpacseTours.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacseOrderBook: async (root, { _id }) => {
          return prepare(await SpacseOrderBooks.findOne(ObjectId(_id)))
        },
        spacseOrderBooks: async (root, { }) => {
          return (await SpacseOrderBooks.find({}).skip(0).limit(50).toArray()).map(prepare)
        },
        bookings: async (root, { _id }) => {
          return prepare(await Bookings.findOne(ObjectId(_id)))
        },
        bookings: async (root, { }) => {
          return (await Bookings.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        reviews: async (root, { _id }) => {
          return prepare(await Reviews.findOne(ObjectId(_id)))
        },
        reviews: async (root, { }) => {
          return (await Reviews.find({}).skip(0).limit(50).toArray()).map(prepare)
        },
        budget: async (root, { _id }) => {
          return prepare(await Budgets.findOne(ObjectId(_id)))
        },
        budgets: async (root, { }) => {
          return (await Budgets.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        accountsetting: async (root, { _id }) => {
          return prepare(await UserAccountSettings.findOne(ObjectId(_id)))
        },
        accountsettings: async (root, { }) => {
          return (await UserAccountSettings.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        event: async (root, { _id }) => {
          return prepare(await Events.findOne(ObjectId(_id)))
        },
        events: async (root, { }) => {
          return (await Events.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        properyBookingDuration: async (root, { _id }) => {
          return prepare(await ProperyBookingDurations.findOne(ObjectId(_id)))
        },
        properyBookingDurations: async (root, { }) => {
          return (await ProperyBookingDurations.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        properyCapacity: async (root, { _id }) => {
          return prepare(await ProperyCapacities.findOne(ObjectId(_id)))
        },
        properyCapacities: async (root, { }) => {
          return (await ProperyCapacities.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        amenity: async (root, { _id }) => {
          return prepare(await Amenities.findOne(ObjectId(_id)))
        },
        amenities: async (root, { }) => {
          return (await Amenities.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacseAmenity: async (root, { _id }) => {
          return prepare(await SpacseAmenities.findOne(ObjectId(_id)))
        },
        spacseAmenities: async (root, { }) => {
          return (await SpacseAmenities.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacseAvaibility: async (root, { _id }) => {
          return prepare(await SpacseAvaibilities.findOne(ObjectId(_id)))
        },
        spacseTours: async (root, { }) => {
          return (await SpacseAvaibilities.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacseAvaibility: async (root, { _id }) => {
          return prepare(await SpacseAvaibilities.findOne(ObjectId(_id)))
        },
        spacseAvaibilities: async (root, { }) => {
          return (await SpacseAvaibilities.find({}).skip(0).limit(50).toArray()).map(prepare)
        },


        spacsePhotoGallery: async (root, { _id }) => {
          return prepare(await SpacsePhotoGalleries.findOne(ObjectId(_id)))
        },
        spacsePhotoGalleries: async (root, { }) => {
          return (await SpacsePhotoGalleries.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        pricingLayer: async (root, { _id }) => {
          return prepare(await PricingLayers.findOne(ObjectId(_id)))
        },
        pricingLayers: async (root, { }) => {
          return (await PricingLayers.find({}).skip(0).limit(50).toArray()).map(prepare)
        },

        filterSpacses: async (root, { category, city, state, maxPrice, minPrice, minCapacity, maxCapacity }) => {

          var filter = { "status": "Active" };
          if (category && category.length > 0) {
            filter.categoryId = { $in: category };
          }
          if (city != undefined && city != "") {
            filter.city = city;
          }
          if (state != undefined && state != "") {
            filter.state = state;
          }
          if (maxCapacity != undefined && minCapacity != undefined) {
            console.log("min" + minCapacity);
            console.log("max " + maxCapacity);
            // var capacityFilter = { 
            //   '$or' : [ 
            //     { "maximumValue": { "$gte" :  minCapacity , "$lte" : maxCapacity }},
            //     { "minimumValue": { "$gte" :  minCapacity , "$lte" : maxCapacity }},
            //     { minCapacity : {  "$gte" :  "$minimumValue" , "$lte" : "$maximumValue" } }
            //     ]
            // };

            var capacityFilter = {
              '$and': [
                { "maximumValue": { "$gte": minCapacity } },
                { "minimumValue": { "$lte": maxCapacity } }
              ]
            };

            //"minimumValue": { "$gte" :  minCapacity , "$lte" : maxCapacity } ,

            //maximumValue
            console.log(capacityFilter);
            var cp = (await ProperyCapacities.find(capacityFilter).skip(0).limit(50).toArray()).map(prepare)
            var capacity = [];
            for (var i = 0; i < cp.length; i++) {
              capacity.push(cp[i]._id);
            }
            if (capacity && capacity.length > 0) {
              filter.capacityId = { $in: capacity };
            }
          }

          if (maxPrice != undefined && minPrice != undefined) {
            var priceFilter = {};
            priceFilter.rate = { "$gte": minPrice, "$lte": maxPrice };
            priceFilter.timeFrameType = "Day";
            var priceLayer = (await PricingLayers.find(priceFilter).skip(0).toArray()).map(prepare)
            console.log(priceLayer);
            var spaceIds = [];
            for (var i = 0; i < priceLayer.length; i++) {
              spaceIds.push(ObjectId(priceLayer[i].spacseId));
            }
            if (spaceIds && spaceIds.length > 0) {
              filter._id = { $in: spaceIds };
            }
          }

          console.log(filter);
          return (await Spacses.find(filter).skip(0).limit(50).toArray()).map(prepare)
        },

        filterRequests: async (root, { capacity, category, city, state, limit, pageNo, dates }) => {
          var filter = { "status": "Active" };
          if (capacity.length > 0) {
            filter.capacityId = { $in: capacity };
          }
          if (category.length > 0) {
            filter.categoryId = { $in: category };
          }
          if (dates.length > 0) {
            filter.$or = [];
            var time = 0;
            var and = [];
            for (i = 0; i < dates.length; i++) {
              dateTime = new Date(dates[i]);
              dateTime.setSeconds(10);
              var time = dateTime.getTime();
              and = [];
              console.log(time);
              and.push({ startDateInSec: { $lte: time } });
              and.push({ endDateInSec: { $gte: time } });
              filter.$or.push({ $and: and });
            }
          }
          if (city != "") {
            filter.city = city;
          }
          if (state != "") {
            filter.state = state;
          }
          var skip = limit * pageNo;

          if (!loginUserId) {
            return (await Requests.find(filter).sort({ "createdAt": -1 }).skip(skip).limit(limit).toArray()).map(prepare);
          } else {
            var requests = (await Requests.find(filter).sort({ "createdAt": -1 }).skip(skip).limit(limit).toArray()).map(prepare);
            for (var i = 0; i < requests.length; i++) {
              var messageFilter = {};
              messageFilter.receiverId = loginUserId;
              messageFilter.isReaded = false;
              messageFilter.requestId = requests[i]._id;
              var messages = (await Messages.find(messageFilter).toArray());
              requests[i].unReadMessageCount = messages.length;
            }
            console.log(requests);
            return requests;
          }
        },

        profileMessages: async (root, { userId }) => {

          var res = [];
          var condi = { "$or": [{ "receiverId": userId }] };

          await (Messages.group(["senderId", "requestId"], condi, { "count": 0 }, "function (obj, prev) { prev.count++; }").then(function (results) {
            res = results;
          }));
          var k = 0;
          var userIds = [];
          var response = [];
          var requestIds = []
          for (var i = 0; i < res.length; i++) {
            var filter = {};
            filter.requestId = res[i].requestId;
            filter.$or = [{ senderId: res[i].senderId }, { receiverId: res[i].senderId }];
            var obj = (await Messages.find(filter).sort({ "createdAt": 1 }).limit(1).toArray()).map(prepare);
            res[i] = obj[0];
          }
          return res;
        },
        getFullMessageHistoryForUser: async (root, { senderId, receiverId, requestId }) => {

          var request = prepare(await Requests.findOne(ObjectId(requestId)));
          if (request) {
            var filter = { "requestId": requestId };
            if (request.userId == senderId) {
              filter.$or = [{ "senderId": receiverId }, { "receiverId": receiverId }];
            } else {
              filter.$or = [{ "senderId": senderId }, { "receiverId": senderId }];
            }

            return (await Messages.find(filter).sort({ "createdAt": 1 }).limit(100).toArray()).map(prepare);
          }
          return [];

        },
      },

      Booking: {
        spacse: async ({ spaceId }) => {
          return prepare(await Spacses.findOne(ObjectId(spaceId)))
        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },

      Reviews: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },

      Favourite: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))

        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },


      },

      PaymentMethod: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },

      User: {
        requests: async ({ _id }) => {
          return (await Requests.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        comments: async ({ _id }) => {
          return (await Comments.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        socialMedias: async ({ _id }) => {
          return (await UserSocialMedias.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        loginSessions: async ({ _id }) => {
          return (await LoginSessions.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        userPaymentInfo: async ({ _id }) => {
          return prepare(await UserPaymentInfos.findOne({ userId: _id }))
        },
        requestFlags: async ({ _id }) => {
          return (await RequestFlags.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        requestTransactions: async ({ _id }) => {
          return (await RequestTransactions.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        spacses: async ({ _id }) => {
          return (await Spacses.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        messageHistories: async ({ _id }) => {
          return (await MessageHistories.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        contactToHosts: async ({ _id }) => {
          return (await ContactToHosts.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        spacseOffers: async ({ _id }) => {
          return (await SpacseOffers.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        spacseTours: async ({ _id }) => {
          return (await SpacseTours.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        orders: async ({ _id }) => {
          return (await SpacseOrderBooks.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        bookings: async ({ _id }) => {
          return (await Bookings.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        reviews: async ({ _id }) => {
          return (await Reviews.find({ userId: _id }).skip(0).limit(50).toArray()).map(prepare)
        },

        events: async ({ _id }) => {
          return (await Events.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        paymentmethods: async ({ _id }) => {
          return (await PaymentMethods.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },
        favourites: async ({ _id }) => {
          return (await Favourites.find({ userId: _id }).limit(50).toArray()).map(prepare)
        },

        accountsetting: async ({ _id }) => {
          var accId = await UserAccountSettings.findOne({ userId: _id });
          if (accId) {
            return prepare(await UserAccountSettings.findOne({ userId: _id }))
          }
          else {
            return { _id: "", smsNotification: "false", generalNotification: "false", reservationNotification: "false", accountNotification: "false" };
          }
        },
      },
      UserSocialMedia: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },
      LoginSession: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },
      UserPaymentInfo: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },
      Category: {
        requests: async ({ _id }) => {
          return (await Requests.find({ categoryId: _id }).limit(50).toArray()).map(prepare)
        },
        spacses: async ({ _id }) => {
          return (await Spacses.find({ categoryId: _id }).limit(50).toArray()).map(prepare)
        }
      },
      UserAccountSetting: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },
      Request: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        category: async ({ categoryId }) => {
          var cat = await Categories.findOne(ObjectId(categoryId));
          if (cat) {
            return prepare(await Categories.findOne(ObjectId(categoryId)))
          } else {
            return { _id: "", title: "" };
          }
        },
        capacity: async ({ capacityId }) => {
          var res = await ProperyCapacities.findOne(ObjectId(capacityId))
          if (res) {
            return prepare(res);
          } else {
            return {};
          }
        },
        budget: async ({ budgetId }) => {
          return prepare(await Budgets.findOne(ObjectId(budgetId)))
        },
        comments: async ({ _id }) => {
          return (await Comments.find({ requestId: _id }).sort({ "createdAt": - 1 }).limit(50).toArray()).map(prepare)
        },
        messages: async ({ _id }, { loginUserId }) => {

          if (loginUserId) {
            var filter = {};
            filter.requestId = _id;
            filter.$or = [{ senderId: loginUserId }, { receiverId: loginUserId }];

            return (await Messages.find(filter).sort({ "createdAt": 1 }).limit(50).toArray()).map(prepare)
          } else {
            return [];
          }
        },
        flags: async ({ _id }) => {
          return (await RequestFlag.find({ requestId: _id }).limit(50).toArray()).map(prepare)
        },
        requestTransactions: async ({ _id }) => {
          return (await RequestTransaction.find({ requestId: _id }).limit(50).toArray()).map(prepare)
        },
        spaces: async ({ _id, userId }, { loginUserId }) => {
          if (userId == loginUserId) {
            return (await RequestsSpacses.find({ requestId: _id }).toArray()).map(prepare)
          } else {
            return (await RequestsSpacses.find({ requestId: _id, userId: loginUserId }).toArray()).map(prepare)
          }

        },
      },
      RequestsSpacse: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        request: async ({ requestId }) => {
          return prepare(await Requests.findOne(ObjectId(requestId)))
        },
      },
      RequestFlag: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        request: async ({ requestId }) => {
          return prepare(await Requests.findOne(ObjectId(requestId)))
        },
      },
      Comment: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        request: async ({ requestId }) => {
          return prepare(await Requests.findOne(ObjectId(requestId)))
        },
        spacse: async ({ requestId }) => {
          return prepare(await Spacses.findOne(ObjectId(requestId)))
        },
        replies: async ({ _id }) => {
          return prepare(await Comments.find({ repliedToCommentId: _id }))
        },
        requestTransaction: async ({ transactionId }) => {
          return prepare(await RequestTransactions.findOne(ObjectId(transactionId)))
        },
      },
      RequestTransaction: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        request: async ({ requestId }) => {
          return prepare(await Requests.findOne(ObjectId(requestId)))
        },
        message: async ({ requestMessageId }) => {
          return prepare(await Messages.findOne(ObjectId(requestMessageId)))
        }
      },
      Message: {
        sender: async ({ senderId }) => {
          return prepare(await Users.findOne(ObjectId(senderId)))
        },
        receiver: async ({ receiverId }) => {
          return prepare(await Users.findOne(ObjectId(receiverId)))
        },
        request: async ({ requestId }) => {
          return prepare(await Requests.findOne(ObjectId(requestId)))
        },
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
        tour: async ({ tourId }) => {
          if (tourId) {
            return (await SpacseTours.find(ObjectId(tourId)).limit(1).toArray()).map(prepare)
          } else {
            return [];
          }
        },
        requestTransaction: async ({ transactionId }) => {
          return (await RequestTransactions.find(ObjectId(transactionId)).limit(1).toArray()).map(prepare)
        }
      },

      OfferMessageHistory: {
        sender: async ({ senderId }) => {
          return prepare(await Users.findOne(ObjectId(senderId)))
        },
        receiver: async ({ receiverId }) => {
          return prepare(await Users.findOne(ObjectId(receiverId)))
        },
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
        spacseoffers: async ({ requestedId }) => {
          if (requestedId) {
            return prepare(await SpacseOffers.findOne(ObjectId(requestedId)))
          }
          else {
            return [];
          }
        }
      },


      Spacse: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        userPaymentInfo: async ({ _id }) => {
          //return  prepare(await UserPaymentInfos.findOne({ spacseId: _id}))
          var res = await UserPaymentInfos.findOne({ spacseId: _id });
          if (res) {
            return prepare(res);
          } else {
            return {};
          }
        },
        spaceCategories: async ({ _id }) => {
          return (await SpaceCategories.find({ spacseId: _id }).toArray()).map(prepare)
        },
        comments: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await Comments.find({ requestId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        flags: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await RequestFlags.find({ requestId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        spacseamenities: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await SpacseAmenities.find({ spacseId: _id }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        avaibilities: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await SpacseAvaibilities.find({ spacseId: _id }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        spacsePhotoGallery: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await SpacsePhotoGalleries.find({ propertyId: _id }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        pricingLayer: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await PricingLayers.find({ spacseId: _id }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        messageHistories: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await MessageHistories.find({ spacseId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        spacseOffers: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await SpacseOffers.find({ spacseId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        spacseTours: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await SpacseTours.find({ spacseId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        orders: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await SpacseOrderBooks.find({ requestId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        bookings: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await Bookings.find({ requestId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },
        reviews: async ({ _id }, { limit, offset }) => {
          if (!limit) {
            limit = 20;
          }
          if (!offset) {
            offset = 0;
          }
          return (await Reviews.find({ spacseId: _id }).sort({ "createdAt": - 1 }).limit(limit).skip(offset).toArray()).map(prepare)
        },

        favourites: async ({ _id }, { userId }) => {

          return (await Favourites.find({ spacseId: _id, userId: userId }).sort({ "createdAt": - 1 }).limit(1).skip(0).toArray()).map(prepare)
        },
        category: async ({ categoryId }) => {
          var res = await Categories.findOne(ObjectId(categoryId));
          if (res) {
            return prepare(res);
          } else {
            return {};
          }

        },
        capacity: async ({ capacityId }) => {
          //return prepare(await ProperyCapacities.findOne(ObjectId(capacityId)))
          var res = await ProperyCapacities.findOne(ObjectId(capacityId));

          if (res) {
            return prepare(res);
          } else {
            return {};
          }
        }
      },
      Amenities: {
        spacse: async ({ _id }) => {
          return (await SpacseAmenities.find({ amenitiesId: _id }).limit(50).toArray()).map(prepare)
        }
      },
      SpacseAmenities: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
        amenities: async ({ amenitiesId }) => {
          return prepare(await Amenities.findOne(ObjectId(amenitiesId)))
        },
      },
      SpacseAvaibilities: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
      },
      SpacsePhotoGallery: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
      },
      PricingLayer: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
      },
      MessageHistory: {
        spacse: async ({ spacseId }) => {
          return (await Spacses.findOne(ObjectId(spacseId)).toArray()).map(prepare)
        },
        sender: async ({ senderId }) => {
          return prepare(await Users.findOne(ObjectId(senderId)))
        },
        reciever: async ({ receiverId }) => {
          return prepare(await Users.findOne(ObjectId(receiverId)))
        },
      },
      ContactToHost: {
        spacse: async ({ spacseId }) => {
          return (await Spacses.findOne(ObjectId(spacseId)).toArray()).map(prepare)
        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },
      SpacseOffer: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        sender: async ({ senderId }) => {
          return prepare(await Users.findOne(ObjectId(senderId)))
        },
        receiver: async ({ receiverId }) => {
          return prepare(await Users.findOne(ObjectId(receiverId)))
        },
      },
      SpacseTour: {
        spacse: async ({ spacseId }) => {
          return prepare(await Spacses.findOne(ObjectId(spacseId)))
        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },
      SpacseOrderBook: {
        spacse: async ({ spacseId }) => {
          return (await Spacses.findOne(ObjectId(spacseId)).toArray()).map(prepare)
        },
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        pricingLayer: async ({ pricingLayerId }) => {
          return prepare(await PricingLayers.findOne(ObjectId(pricingLayerId)))
        },
      },

      Event: {
        user: async ({ userId }) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
      },

      Mutation: {

        submitSpacesForRequest: async (root, args, context, info) => {
          var request = prepare(await Requests.findOne(ObjectId(args.requestId)))
          if (request) {
            for (var i = 0; i < args.spacsesId.length; i++) {
              var data = {
                "requestId": args.requestId,
                "userId": args.userId,
                "description": args.description,
                "spaceLink": args.spaceLink,
                "spacseId": args.spacsesId[i]
              };
              const res = await RequestsSpacses.insert(data);


              var currentTime = Date.now();
              args.createdAt = currentTime;
              var data = {
                senderId: args.userId,
                receiverId: request.userId,
                requestId: args.requestId,
                spacseId: args.spacsesId[i],
                comment: args.description,
                messageType: "initialized",
                createdAt: args.createdAt,
                isReaded: false
              }

              const msg = await Messages.insert(data);
              //return prepare(await Messages.findOne({ _id: res.insertedIds[1] }))

            }
            return { "message": "SpacseForRequest is submitted ", "code": "200" };
          } else {
            return { "message": "Invalid request id ", "code": "400" };
          }
        },
        updateUser: async (root, args, context, info) => {
          const user = await Users.findOne(ObjectId(args._id));
          if (user) {
            Object.keys(args).forEach(function (key) {
              if (key == "_id") {
                user[key] = ObjectId(args[key]);
              } else {
                if (key == "profilePic") {
                  if (args[key]) {
                    user[key] = args[key];
                  }
                } else {
                  user[key] = args[key];
                }
              }
            });

            await Users.update({ _id: ObjectId(user._id) }, user);
            return { "message": "User profile updated ", "code": "200" };
          } else {
            return { "message": "No Rights", "code": "400" };
          }

        },
        createUser: async (root, args, context, info) => {

          const res = await Users.findOne({ email: args.email });
          if (res) {
            return { "message": "Email already exist", "code": "400" };
          } else {
            var currentTime = Date.now();
            args.createdAt = currentTime;
            const res = await Users.insert(args)
            var user = prepare(await Users.findOne({ _id: res.insertedIds[1] }))
            var userId = res.insertedIds[1].toString();

            return { "message": "Registration done successfully", "code": "200" };
          }

        },

        loginWithFacebook: async (root, args, context, info) => {


          var socialMedia = await UserSocialMedias.findOne({ socialMediaName: "Facebook", socialMediaId: args.fbid });
          if (socialMedia) {
            let LSdata = { 'userId': socialMedia.userId, session: new Date().toISOString() + "-" + socialMedia.userId };
            const res = await LoginSessions.insert(LSdata)
            return res.ops[0];
          }

          var user = await Users.findOne({ email: args.email });
          if (user) {
            user = prepare(user);
            var data = {};
            data.userId = user._id;
            data.socialMediaName = "Facebook";
            data.socialMediaId = args.fbid;
            socialMedia = await UserSocialMedias.insert(data);

            let LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + socialMedia.userId };
            var res = await LoginSessions.insert(LSdata)
            return res.ops[0];
          }

          var currentTime = Date.now();
          args.createdAt = currentTime;
          var res = await Users.insert(args)
          user = prepare(await Users.findOne({ _id: res.insertedIds[1] }))

          let LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + user.userId };
          res = await LoginSessions.insert(LSdata)
          return res.ops[0];
        },

        loginWithGoogle: async (root, args, context, info) => {


          var socialMedia = await UserSocialMedias.findOne({ socialMediaName: "Google", socialMediaId: args.gid });
          if (socialMedia) {
            let LSdata = { 'userId': socialMedia.userId, session: new Date().toISOString() + "-" + socialMedia.userId };
            const res = await LoginSessions.insert(LSdata)
            return res.ops[0];
          }

          var user = await Users.findOne({ email: args.email });
          if (user) {
            user = prepare(user);
            var data = {};
            data.userId = user._id;
            data.socialMediaName = "Google";
            data.socialMediaId = args.gid;
            socialMedia = await UserSocialMedias.insert(data);

            let LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + socialMedia.userId };
            var res = await LoginSessions.insert(LSdata)
            return res.ops[0];
          }

          var currentTime = Date.now();
          args.createdAt = currentTime;
          var res = await Users.insert(args)
          user = prepare(await Users.findOne({ _id: res.insertedIds[1] }))
          let LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + user.userId };
          res = await LoginSessions.insert(LSdata)
          return res.ops[0];
        },

        signUpLinkedIN: async (root, args, context, info) => {


          var socialMedia = await UserSocialMedias.findOne({ socialMediaName: "LinkedIn", socialMediaId: args.likedInId });
          if (socialMedia) {
            let LSdata = { 'userId': socialMedia.userId, session: new Date().toISOString() + "-" + socialMedia.userId };
            const res = await LoginSessions.insert(LSdata)
            return res.ops[0];
          }

          var user = await Users.findOne({ email: args.email });
          if (user) {
            user = prepare(user);
            var data = {};
            data.userId = user._id;
            data.socialMediaName = "LinkedIn";
            data.socialMediaId = args.likedInId;
            socialMedia = await UserSocialMedias.insert(data);

            let LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + socialMedia.userId };
            var res = await LoginSessions.insert(LSdata)
            return res.ops[0];
          }
          var currentTime = Date.now();
          args.createdAt = currentTime;
          var res = await Users.insert(args)
          user = prepare(await Users.findOne({ _id: res.insertedIds[1] }))
          let LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + user.userId };
          res = await LoginSessions.insert(LSdata)
          return res.ops[0];
        },




        createUserAccountSetting: async (root, args) => {
          var id = await UserAccountSettings.findOne({ "userId": args.userId })
          if (id) {
            id.smsNotification = args.smsNotification;
            id.generalNotification = args.generalNotification;
            id.reservationNotification = args.reservationNotification;
            id.accountNotification = args.accountNotification;
            const res = await UserAccountSettings.update({ "userId": args.userId }, id);
            return { "message": "Set the Notification", "code": "200" };
          }
          else {
            const res = await UserAccountSettings.insert(args)
            var accId = prepare(await UserAccountSettings.findOne({ _id: res.insertedIds[1] }))
            return { "message": "Set the Notification ", "code": "200" };
          }
        },

        createLoginSession: async (root, args, context, info) => {
          const res = await LoginSessions.insert(args)
          return prepare(await LoginSessions.findOne({ _id: res.insertedIds[1] }))
        },
        createBudget: async (root, args, context, info) => {
          const res = await Budgets.insert(args)
          return prepare(await Budgets.findOne({ _id: res.insertedIds[1] }))
        },
        createCategory: async (root, args, context, info) => {
          const res = await Categories.insert(args)
          return prepare(await Categories.findOne({ _id: res.insertedIds[1] }))
        },
        createRequest: async (root, args, context, info) => {

          var ses = (await Requests.find({}).skip(0).limit(50).toArray()); // .map(prepare);
          for (var i = 0; i < ses.length; i++) {
            ses[i].startDateInSec = (new Date(ses[i].startDate + " 00:00:01 ")).getTime();
            ses[i].endDateInSec = (new Date(ses[i].endDate + " 23:59:59 ")).getTime();
            Requests.update({ _id: ses[i]._id }, ses[i]);
          }


          var currentTime = Date.now();
          args.createdAt = currentTime;
          args.startDateInSec = (new Date(args.startDate + " 00:00:01 ")).getTime();
          args.endDateInSec = (new Date(args.endDate + "  23:59:59 ")).getTime();
          args.status = "Pending";
          const res = await Requests.insert(args)
          return prepare(await Requests.findOne({ _id: res.insertedIds[1] }))
        },
        updateRequestCounter: async (root, args) => {
          const id = await RequestViews.findOne({ $and: [{ "requestId": args.requestId }, { "userId": args.userId }] })

          if (id) {
            id.view = id.view + 1;
            const res = await RequestViews.update({ $and: [{ "requestId": args.requestId }, { "userId": args.userId }] }, id);
            return { "message": "RequestView  Updated", "code": "200" };
          }
          else {
            args.view = 1;
            const res = await RequestViews.insert(args)
            var viewId = prepare(await RequestViews.findOne({ _id: res.insertedIds[1] }))
            return { "message": "RequestView  Inserted", "code": "400" };
          }

        },

        createRequestFlag: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          const res = await RequestFlags.insert(args)
          return prepare(await RequestFlags.findOne({ _id: res.insertedIds[1] }))
        },
        createComment: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          const res = await Comments.insert(args);

          //return (await Comments.find({ "spacseId" : args.requestId }).sort({"createdAt": - 1}).toArray()).map(prepare)
          return prepare(await Comments.findOne({ _id: res.insertedIds[1] }))
        },

        createMessage: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          args.isReaded = false;
          const res = await Messages.insert(args);
          return prepare(await Messages.findOne({ _id: res.insertedIds[1] }))
        },

        createOfferMessage: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          const res = await OfferMessageHistories.insert(args);
          return prepare(await OfferMessageHistories.findOne({ _id: res.insertedIds[1] }))
        },

        createRequestTransaction: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          const res = await RequestTransactions.insert(args);
          return prepare(await RequestTransactions.findOne({ _id: res.insertedIds[1] }))
        },

        submitForApproval: async (root, args) => {
          const spaces = (await Spacses.findOne(ObjectId(args.spacseId)));
          if (spaces) {
            var currentTime = Date.now();
            spaces.createdAt = currentTime;
            spaces.TotalReview = 0
            spaces.AvgReview = 0
            spaces.status = "Pending";
            const res = await Spacses.update({ _id: ObjectId(args.spacseId) }, spaces);
            return { "message": "Your space submitted for approval", "code": "200" };
          } else {
            return { "message": "Sorry try again", "code": "400" };
          }
        },

        createPaymentMethod: async (root, args) => {
          const res = await PaymentMethods.insert(args);
          return prepare(await PaymentMethods.findOne({ _id: res.insertedIds[1] }))
        },

        doPayment: async (root, args) => {

          if (args.token) {

            stripe.charges.create({
              amount: args.amount,
              currency: "usd",
              description: args.reason,
              source: args.token,
            }).then((charge) => {
              console.log(charge);
            }).catch(err => {
              console.log(args);
            });
            /*  await (stripe.charges.create({
               amount: args.amount,
               currency: "usd",
               description: args.reason,
               source: args.token,
             }, (err, charge) => {
               console.log(args);
               if(err){
                // response = { "message": err, "code": "400" };
                 return { "message": err, "code": "400" };
               }else{
                 if(charge.status == "succeeded"){
                   var transaction = {};
                   args.transactionInfo = JSON.stringify(charge);
                   const res = RequestTransactions.insert(args);
                   RequestTransactions.findOne({ _id: res.insertedIds[1] })
 
                   return { "message": "Payment Done", "code": "200" };
                 }else{
                   return { "message": "Please try again", "code": "400" };
                 }
               }
             }));
            // console.log(response);
            // return response; */
          }
          else {
            return { "message": "Please try code not found again", "code": "400" };
          }


        },
        createFavourite: async (root, args) => {

          var match = await Favourites.findOne({ $and: [{ "userId": { $eq: args.userId } }, { "spacseId": { $eq: args.spacseId } }] });

          console.log("match" + match);
          if (match == null) {
            const res = await Favourites.insert(args);
            var id = await Favourites.findOne({ _id: res.insertedIds[1] })
            return { "message": "Spacse is added to your Favourites", "code": "200", "id": id._id };
          }
          else {
            var id = match._id;
            const res = await Favourites.remove({ "_id": ObjectId(id) });
            return { "message": "Spacse is removed from your Favourites", "code": "400", "id": id };
          }
        },

        createSpacseReview: async (root, args) => {

          var currentTime = Date.now();
          args.createdAt = currentTime;

          const res = await Reviews.insert(args);
          var id = (await Reviews.findOne({ _id: res.insertedIds[1] }))

          var filter = {};
          filter.spacseId = args.spacseId;
          var match = (await Reviews.find(filter).toArray()).map(prepare);
          console.log(match);

          if (match.length > 0) {

            var totalreview = 0
            var avgrating = 0
            var rating = 0
            for (let i = 0; i < match.length; i++) {
              totalreview = totalreview + 1;
              rating = rating + match[i].rate;
            }
            avgrating = (rating / match.length)
            var avgreviewspacse = await Spacses.update({ _id: ObjectId(args.spacseId) }, { $set: { "AvgReview": avgrating, "TotalReview": totalreview } })
          }
          return { "message": "Review added", "code": "200" };


        },
        createSpacseTour: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          const res = await SpacseTours.insert(args);
          return prepare(await SpacseTours.findOne({ _id: res.insertedIds[1] }))
        },

        createProperyCapacity: async (root, args) => {
          const res = await ProperyCapacities.insert(args)
          return prepare(await ProperyCapacities.findOne({ _id: res.insertedIds[1] }))
        },
        createAmenities: async (root, args) => {
          const res = await Amenities.insert(args)
          return prepare(await Amenities.findOne({ _id: res.insertedIds[1] }))
        },

        createSpacseAmenities: async (root, args) => {
          for (var i = 0; i < args.amenitiesIds.length; i++) {
            var data = { "amenitiesId": args.amenitiesIds[i], "spacseId": args.spacseId };
            const res = await SpacseAmenities.insert(data)
          }

          return (await SpacseAmenities.find({ "spacseId": args.spacseId }).toArray()).map(prepare)
          //  return prepare(await  SpacseAmenities.findOne({ _id: res.insertedIds[1] }))
        },
        createUserPaymentInfo: async (root, args) => {
          await UserPaymentInfos.remove({ "spacseId": args.spacseId });

          var currentTime = Date.now();
          args.createdAt = currentTime;

          const res = await UserPaymentInfos.insert(args)
          return prepare(await UserPaymentInfos.findOne({ _id: res.insertedIds[1] }))

        },

        createSpacse: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          var spacseId = "";
          spacseId = args._id;
          delete args['_id'];

          if (spacseId) {
            const spaces = (await Spacses.findOne(ObjectId(spacseId)));
            for (key in args) {
              spaces[key] = args[key];
            }
            await Spacses.update({ _id: ObjectId(spacseId) }, spaces);

          } else {
            var currentTime = Date.now();
            args.createdAt = currentTime;

            const res = await Spacses.insert(args);
            spacseId = res.insertedIds[1].toString();
          }


          await SpacseAmenities.remove({ "spacseId": spacseId })
          for (var i = 0; i < args.aminities.length; i++) {
            var data = { "amenitiesId": args.aminities[i], "spacseId": spacseId };
            const res = await SpacseAmenities.insert(data)
          }

          await SpacseAvaibilities.remove({ "spacseId": spacseId })
          for (var i = 0; i < args.avaibilities.length; i++) {
            var data = {
              "days": args.avaibilities[i].days,
              "startTime": args.avaibilities[i].startTime,
              "endTime": args.avaibilities[i].endTime,
              "spacseId": spacseId
            };
            const res = await SpacseAvaibilities.insert(data)
          }
          return prepare(await Spacses.findOne(ObjectId(spacseId)));
        },

        updatePassword: async (root, args) => {
          const match = await Users.findOne({ $and: [{ "_id": { $eq: ObjectId(args._id) } }, { "password": { $eq: args.oldpassword } }] });

          if (match) {
            match.password = args.newpassword;
            const res = await Users.update({ _id: ObjectId(args._id) }, match);
            return { "message": " Password Updated Successfully", "code": "200" };
          }
          else {
            return { "message": "Old password is not match", "code": "400" };
          }
        },

        updateRequest: async (root, args) => {
          const id = await Requests.findOne(ObjectId(args._id));
          if (id) {
            var currentTime = Date.now();
            args._id = ObjectId(args._id)
            args.updatedAt = currentTime;
            args.startDateInSec = (new Date(args.startDate + " 00:00:01 ")).getTime();;
            args.endDateInSec = (new Date(args.endDate + " 00:00:01 ")).getTime();;
            args.status = "Pending";
            const res = await Requests.update({ _id: ObjectId(args._id) }, args);
            return { "message": "Your Request is updated and sent for approval", "code": "200" };
          }
          else {
            return { "message": "Request  Not Updated", "code": "400" };
          }
        },

        updatePrice: async (root, args) => {
          for (var i = 0; i < args.pricing.length; i++) {
            await PricingLayers.remove({ "spacseId": args.pricing[i].spacseId });
          }
          for (var i = 0; i < args.pricing.length; i++) {
            await PricingLayers.insert(args.pricing[i]);
          }
          return { "message": "Register done", "code": "200" };

        },

        updateSecurityDeposit: async (root, args) => {

          var space = await Spacses.findOne({ "_id": ObjectId(args.spacseId) }, { "securityDeposit": args.securityDeposit })
          if (space) {
            space.securityDeposit = args.securityDeposit;
            const res = await Spacses.update({ _id: ObjectId(args.spacseId) }, { $set: { "securityDeposit": args.securityDeposit } })
            return { "message": "Securitydeposit Updated", "code": "200" };
          }
          else {
            const res = await Spacses.insert(args);
            return { "message": "Securitydeposit added", "code": "200" };
          }
        },

        updateAdditionalFees: async (root, args) => {
          var space = await Spacses.findOne({ "_id": ObjectId(args.spacseId) }, { "additionalFees": args.additionalFees })
          if (space) {
            const res = await Spacses.update({ _id: ObjectId(args.spacseId) }, { $set: { "additionalFees": args.additionalFees } })
            return { "message": "Additional Fees Updated", "code": "200" };
          }
          else {
            const res = await Spacses.insert(args);
            return { "message": "Additional Fees added", "code": "200" };
          }
        },
        uploadImages: async (root, args) => {

          //const spaces = await  Spacses.findOne({ _id : args.spacseId }) 
          const spaces = (await Spacses.findOne(ObjectId(args.spacseId)))
          if (!spaces) {
            throw new Error(`Couldn’t find space with id `);
          }
          spaces.coverPictire = args.coverPic;
          const res = await Spacses.update({ _id: ObjectId(args.spacseId) }, spaces); // .insert(args.pricing[i]);

          await SpacsePhotoGalleries.remove({ "propertyId": args.spacseId })
          for (var i = 0; i < args.photoGellary.length; i++) {
            var data = {
              "propertyId": args.spacseId,
              "imageUrl": args.photoGellary[i],
              "status": "Active"
            }
            await SpacsePhotoGalleries.insert(data);
          }

          return { "message": "Images uploaded successfully", "code": "200" };
        },
        createSpaceStep1: async (root, args) => {
          let res = {};
          var spaceId = "";
          if (args.spacseId) {
            let spacse = await Spacses.findOne(ObjectId(args.spacseId));
            if (spacse) {
              spacse.categoryId = args.categoryId[0];
              spacse.userId = args.userId;
              spacse.status = "In Process";
              res = await Spacses.update({ _id: ObjectId(args.spacseId) }, spacse);

              await SpaceCategories.remove({ "spacseId": args.spacseId })
              for (var i = 0; i < args.categoryId.length; i++) {
                var data = {};
                data.spacseId = args.spacseId;
                data.categoryId = args.categoryId[i];
                await SpaceCategories.insert(data);
              }
              return { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId };
            } else {
              var categories = args.categoryId;
              args.categoryId = args.categoryId[0];
              res = await Spacses.insert(args);
              spaceId = res.insertedIds[1];

              for (var i = 0; i < categories.length; i++) {
                var data = {};
                data.spacseId = spaceId;
                data.status = "In Process";
                data.categoryId = args.categoryId[i];
                await SpaceCategories.insert(data);
              }
              return { "message": "Temp Spacse Created", "code": "200", "id": spaceId };
            }
          } else {
            var categories = args.categoryId;
            args.categoryId = args.categoryId[0];
            args.status = "In Process";
            res = await Spacses.insert(args);
            spaceId = res.insertedIds[1];
            return { "message": "Temp Spacse Created", "code": "200", "id": spaceId };
          }
        },
        createSpaceStep2: async (root, args) => {
          let spacse = await Spacses.findOne(ObjectId(args.spacseId));
          if (spacse) {
            spacse.capacityId = args.capacityId;
            spacse.numberOfRooms = args.numberOfRooms;
            spacse.numberOfRestRooms = args.numberOfRestRooms;
            spacse.squareFootArea = args.squareFootArea;
            await Spacses.update({ _id: ObjectId(args.spacseId) }, spacse);
            return { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId };
          } else {
            return { "message": "Spacse not found", "code": "400" };
          }
        },
        createSpaceStep3: async (root, args) => {

          let spacse = await Spacses.findOne(ObjectId(args.spacseId));
          if (spacse) {
            await SpacseAmenities.remove({ "spacseId": args.spacseId })
            for (var i = 0; i < args.aminities.length; i++) {
              var data = { "amenitiesId": args.aminities[i], "spacseId": args.spacseId };
              const res = await SpacseAmenities.insert(data)
            }
            return { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId };
          } else {
            return { "message": "Spacse not found", "code": "400" };
          }
        },
        createSpaceStep4: async (root, args) => {
          let spacse = await Spacses.findOne(ObjectId(args.spacseId));
          if (spacse) {
            spacse.state = args.state;
            spacse.address = args.address;
            spacse.city = args.city;
            spacse.country = args.country;
            spacse.latitude = args.latitude;
            spacse.longitude = args.longitude;
            await Spacses.update({ _id: ObjectId(args.spacseId) }, spacse);
            return { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId };
          } else {
            return { "message": "Spacse not found", "code": "400" };
          }
        },
        createSpaceStep5: async (root, args) => {
          let spacse = await Spacses.findOne(ObjectId(args.spacseId));
          if (spacse) {
            await SpacseAvaibilities.remove({ "spacseId": args.spacseId })
            for (var i = 0; i < args.avaibilities.length; i++) {
              var data = {
                "days": args.avaibilities[i].days,
                "startTime": args.avaibilities[i].startTime,
                "endTime": args.avaibilities[i].endTime,
                "spacseId": args.spacseId
              };
              const res = await SpacseAvaibilities.insert(data)
            }


            return { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId };
          } else {
            return { "message": "Spacse not found", "code": "400" };
          }
        },
        createSpaceStep6: async (root, args) => {
          let spacse = await Spacses.findOne(ObjectId(args.spacseId));
          if (spacse) {
            spacse.title = args.title;
            spacse.subTitle = args.subTitle;
            spacse.description = args.description;
            await Spacses.update({ _id: ObjectId(args.spacseId) }, spacse);
            return { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId };
          } else {
            return { "message": "Spacse not found", "code": "400" };
          }
        },
        createSpaceStep7: async (root, args) => {
          return { "message": "Images uploaded successfully", "code": "200" };
        },
        createSpaceStep8: async (root, args) => {
          return { "message": "Images uploaded successfully", "code": "200" };
        },

        setPrivate: async (root, args) => {
          let spacse = await Spacses.findOne(ObjectId(args.spacseId));
          if (spacse) {
            spacse.isPrivate = args.isPrivate;
            await Spacses.update({ _id: ObjectId(args.spacseId) }, spacse);
            return { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId };
          } else {
            return { "message": "Spacse not found", "code": "400" };
          }
        },

        createContactToHost: async (root, args) => {
          if (args.isDateFlexible == null) {
            args.isDateFlexible = false
          }
          var currentTime = Date.now();
          args.createdAt = currentTime;
          const res = await ContactToHosts.insert(args);
          return prepare(await ContactToHosts.findOne({ _id: res.insertedIds[1] }))
        },
        createSpacseOffer: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          const res = await SpacseOffers.insert(args);
          var offerId = prepare(await SpacseOffers.findOne({ _id: res.insertedIds[1] }))
          console.log("offerId" + offerId._id)


          var currentTime = Date.now();
          args.createdAt = currentTime;
          var data = {
            senderId: args.senderId,
            receiverId: args.receiverId,
            spacseId: args.spacseId,
            requestedId: offerId._id,
            messageType: "initialized",
            createdAt: args.createdAt
          }
          const msg = await OfferMessageHistories.insert(data);
          console.log("msg:" + msg);
          return prepare(await SpacseOffers.findOne({ _id: res.insertedIds[1] }))

        },
        updateStatus: async (root, args) => {
          if (args.status && args.spacseIds) {
            for (var i = 0; i < args.spacseIds.length; i++) {
              const spaces = (await Spacses.findOne(ObjectId(args.spacseIds[i])));
              if (spaces) {
                spaces.status = args.status;
                const res = await Spacses.update({ _id: ObjectId(args.spacseIds[i]) }, spaces);
              }
            }
            return { "message": "Status Updated", "code": "200" };
          } else {
            return { "message": "Spacse not found !!!", "code": "400" };
          }
        },
        updateRequestStatus: async (root, args) => {
          if (args.status && args.requestIds) {
            for (var i = 0; i < args.requestIds.length; i++) {
              const requests = (await Requests.findOne(ObjectId(args.requestIds[i])));
              if (requests) {
                requests.status = args.status;
                const res = await Requests.update({ _id: ObjectId(args.requestIds[i]) }, requests);
              }
            }
            return { "message": "Request Status Updated", "code": "200" };
          } else {
            return { "message": "Request not found !!!", "code": "400" };
          }
        },
        updateBookingStatus: async (root, args) => {
          var booking = await Bookings.findOne(ObjectId(args.id));
          if (booking) {
            booking.status = args.status;
            const res = await Bookings.update({ _id: ObjectId(args.id) }, booking);

            var spaces = (await Spacses.findOne(ObjectId(booking.spaceId)));
            var user = (await Users.findOne(ObjectId(booking.userId)));
            if (spaces && user) {
              var mailText = "";
              var mailHeader = "";
              if (args.status == "Accepted") {
                mailHeader = "Congratulations you booking request accepted!!!"
                mailText = "Your booking request for " + spaces.title + " is accepted please complete your payment process!!!";
              } else {
                mailHeader = "Sorry you booking request is rejected!!!"
                mailText = "Your booking request for " + spaces.title + " is accepted please complete your payment process!!!";
              }
              var mailOptions = {
                from: 'mitul@dreamwarrior.com',
                to: user.email,
                subject: mailHeader,
                text: mailText
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            }

            return { "message": "Status Updated", "code": "200" };
          } else {
            return { "message": "Booking not found !!!", "code": "400" };
          }
        },
        bookSpacse: async (root, args) => {
          var currentTime = Date.now();
          args.createdAt = currentTime;
          args.updatedAt = currentTime;

          stripe.charges.create({
            amount: args.amount,
            currency: "usd",
            description: args.reason,
            source: args.token,
          }).then((charge) => {
            console.log(charge);
          }).catch(err => {
            console.log(args);

          });

          /*  transactionId : String
            status : String
            paymentStatus: String */

        },

      },

    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cors())

    var storage = multer.diskStorage({

      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
          cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
      }
    });

    const upload = multer({
      storage: storage
    });

    app.use('/uploads', express.static('uploads'))
    app.use('/graphql',
      upload.array('files'),
      bodyParser.json(),
      graphqlExpress({ schema })
    )

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }))

    app.post('/book-space', function (request, response) {
      var args = request.body
      stripe.charges.create({
        amount: args.amount,
        currency: "usd",
        description: args.reason,
        source: args.token,
        capture: false,
      }).then((charge) => {
        console.log(charge.status);
        if (charge.status == "succeeded") {

          //  var currentTime = new Date().toISOString() 
          var currentTime = Date.now()
          args.createdAt = currentTime;
          args.transactionId = charge.id;
          args.status = "Pending";
          args.paymentStatus = "Authorized";
          args.paymentId = charge.id;
          args.amount = args.amount / 100;
          const res = Bookings.insert(args);

          Users.findOne(ObjectId(args.spaceUserId), function (err, doc) {
            if (err || !doc) {
              console.log("no record");
              return;
            }
            var mailOptions = {
              from: 'mitul@dreamwarrior.com',
              to: doc.email,
              subject: 'You have new booking request',
              text: 'You got new booking request....Please login and check it.'
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          })

          Users.findOne(ObjectId(args.userId), function (err, doc) {
            if (err || !doc) {
              console.log("no record");
              return;
            }
            var mailOptions = {
              from: 'mitul@dreamwarrior.com',
              to: doc.email,
              subject: 'Thank you for booking',
              text: 'Thank you for booking once user will accept booking you will get the notification for the confirmation'
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          })


          // sendBookingMailToHost(args);
          // sendBookingMailToCustomer(args);

          response.send({ "code": 200, message: "Booking success." });
        } else {
          response.send({ "code": 400, message: "Fail Please try again" });
        }

      }).catch(err => {
        response.send({ "code": 400, message: err });
      });

    });

    app.post('/pay-for-booking', function (request, response) {
      var args = request.body;
      Bookings.findOne({ _id: ObjectId(args.id) }, function (err, booking) {
        if (err) {
          response.send({ "message": "Booking not found", "code": "400" });
        } else {
          if (args.status == "Cancel") {
            response.send({ "message": "Your booking canceled ", "code": "400" });
          } else {
            stripe.charges.create({
              amount: (args.amount / 100),
              currency: "usd",
              description: args.reason,
              source: args.token,
              capture: false,
            }).then((charge) => {
              if (charge.status == "succeeded") {
                booking.paymentStatus = "Paid";
                booking.paymentId = charge.id;
                const res = Bookings.update({ _id: ObjectId(args.id) }, booking);
                response.send({ "message": "Thank you! your spacse is booked now.", "code": 200 });
              } else {
                response.send({ "message": "Sorry! there is some problem please try again.", "code": 400 });
              }
            });
          }
        }
      });
    });
    app.post('/book-confirm', function (request, response) {
      var args = request.body;

      Bookings.findOne({ _id: ObjectId(args.id) }, function (err, booking) {
        if (err) {
          response.send({ "message": "Booking not found", "code": "400" });
        } else {
          if (args.status == "Cancel") {
            response.send({ "message": "Your booking canceled ", "code": "400" });
          } else {
            stripe.charges.capture(booking.paymentId, function (err, charge) {
              console.log(charge);
              if (err) {
                booking.paymentStatus = "Rejected";
                const res = Bookings.update({ _id: ObjectId(args.id) }, booking);
                response.send({ "message": "Problem with charging your debit / creadit card please pay now", "code": "404" });
              } else {
                if (charge.status == "succeeded") {
                  booking.paymentStatus = "Paid";
                  const res = Bookings.update({ _id: ObjectId(args.id) }, booking);
                  response.send({ "message": "Thank you! your spacse is booked now.", "code": 200 });
                } else {
                  booking.paymentStatus = "Rejected";
                  const res = Bookings.update({ _id: ObjectId(args.id) }, booking);
                  response.send({ "message": "Problem with charging your debit / creadit card please pay now", "code": "404" });
                }
              }
            });
            //response.send({ "message": "Booking not found", "code": "400" });
          }
        }
      });
    });
    app.post('/pay-invoice', function (request, response) {
      var args = request.body
      RequestTransactions.findOne({ _id: ObjectId(args.requestTransactionId) }, function (err, doc) {
        if (err) {
          response.send({ "message": "Please try again", "code": "400" });
        } else {
          console.log(doc);
          if (args.token) {
            stripe.charges.create({
              amount: args.amount,
              currency: "usd",
              description: args.reason,
              source: args.token,
            }).then((charge) => {
              if (charge.status == "succeeded") {
                var transaction = {};
                doc.status = "Paid";
                RequestTransactions.update({ _id: ObjectId(args.requestTransactionId) }, doc);
                args.transactionInfo = JSON.stringify(charge);
                RequestTransactions.insert(args);
                response.send({ "message": "Please try again", "code": "200" });
              } else {
                response.send({ "message": "Please try again", "code": "400" });
              }
            });
          } else {
            response.send({ "code": 400, message: "Fail Please try again" });
          }
        }
      });


    });
    app.all('/file-upload', upload.single("file"), function (req, res, next) {

      try {
        var dimensions = sizeOf(req.file.path);

        if (req.body && req.body.maintainRatio == 'true') {
          var dimensions = sizeOf(req.file.path);
          var width = dimensions.width;
          var height = dimensions.height;
          var ratio = width / height;
          if (ratio >= 1.4 && ratio <= 2) {
            res.send(req.file);
          } else {
            res.send({ "status": "fail", "message": "Please upload image with 3:2 ratio" });
          }
        } else if (req.body && req.body.maintainRatio == 'square') {
          var dimensions = sizeOf(req.file.path);
          var width = dimensions.width;
          var height = dimensions.height;
          var ratio = width / height;
          if (ratio > 0.9 && ratio <= 1.1) {
            res.send(req.file);
          } else {
            res.send({ "status": "fail", "message": "Please upload square image" });
          }
        } else {
          res.send(req.file);
        }
      } catch (err) {
        res.send({ "status": "fail", "message": "Please upload image with 3:2 ratio" });
      }

    })

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}