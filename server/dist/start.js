'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

var _mongodb = require('mongodb');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _graphql = require('graphql');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mime = require('mime');

var _mime2 = _interopRequireDefault(_mime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

//var bodyParser = require('body-parser'); 
var sizeOf = require('image-size');
var nodemailer = require('nodemailer');
var stripe = (0, _stripe2.default)('sk_test_SLC8fN89U42efy7PNINWEiGe');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mitul@dreamwarrior.com',
    pass: 'Mitul@69'
  }
});

var URL = 'http://ec2-54-245-64-1.us-west-2.compute.amazonaws.com';
var PORT = 3001;
var MONGO_URL = 'mongodb://localhost:27017/spaces';

var prepare = function prepare(o) {
  o._id = o._id.toString();
  return o;
};

var start = exports.start = function _callee() {
  var _Query, db, Requests, Categories, Comments, Messages, UserSocialMedias, LoginSessions, UserPaymentInfos, RequestFlags, RequestTransactions, Spacses, MessageHistories, ContactToHosts, SpacseOffers, SpacseTours, SpacseOrderBooks, Events, ProperyBookingDurations, ProperyCapacities, Amenities, SpacseAmenities, SpacseAvaibilities, SpacsePhotoGalleries, PricingLayers, Budgets, UserAccountSettings, RequestViews, Users, Bookings, SpaceCategories, RequestsSpacses, PaymentMethods, Favourites, typeDefs, resolvers, schema, app, storage, upload;

  return regeneratorRuntime.async(function _callee$(_context228) {
    while (1) {
      switch (_context228.prev = _context228.next) {
        case 0:
          _context228.prev = 0;
          _context228.next = 3;
          return regeneratorRuntime.awrap(_mongodb.MongoClient.connect(MONGO_URL));

        case 3:
          db = _context228.sent;
          Requests = db.collection('requests');
          Categories = db.collection('categoris');
          Comments = db.collection('comments');
          Messages = db.collection('messages');
          UserSocialMedias = db.collection('user_social_medias');
          LoginSessions = db.collection('login_sessions');
          UserPaymentInfos = db.collection('user_payment_infos');
          RequestFlags = db.collection('request_flags');
          RequestTransactions = db.collection('request_transactions');
          Spacses = db.collection('spacses');
          MessageHistories = db.collection('message_histories');
          ContactToHosts = db.collection('contact_to_hosts');
          SpacseOffers = db.collection('spacse_offers');
          SpacseTours = db.collection('spacse_tours');
          SpacseOrderBooks = db.collection('spacse_order_books');
          Events = db.collection('events');
          ProperyBookingDurations = db.collection('propery_booking_durations');
          ProperyCapacities = db.collection('propery_capacities');
          Amenities = db.collection('amenities');
          SpacseAmenities = db.collection('spacse_amenities');
          SpacseAvaibilities = db.collection('spacse_avaibilities');
          SpacsePhotoGalleries = db.collection('spacse_photo_galleries');
          PricingLayers = db.collection('pricing_layers');
          Budgets = db.collection('budgets');
          UserAccountSettings = db.collection('user_account_settings');
          RequestViews = db.collection('request_views');
          Users = db.collection('users');
          Bookings = db.collection('bookings');
          SpaceCategories = db.collection('space_categories');
          RequestsSpacses = db.collection('request_spacses');
          PaymentMethods = db.collection('payment_methods');
          Favourites = db.collection('user_favourites');
          typeDefs = ['\n      input Upload {\n        name: String!\n        type: String!\n        size: Int!\n        path: String!\n      }\n\n      type Query {\n        user(_id: String) : User\n        login(email: String, password: String) : LoginSession\n        request(_id: String) : Request\n        category(_id: String) : Category\n        comment(_id: String) : Comment\n        userSocialMedia(_id: String) : UserSocialMedia\n        loginSession(_id: String) : LoginSession\n        userPaymentInfo(_id: String) : UserPaymentInfo\n        requestFlag(_id: String) : RequestFlag\n        requestTransaction(_id: String) : RequestTransaction\n        spacse(_id: String) : Spacse\n        messageHistory(_id: String) : MessageHistory\n        contactToHost(_id: String) : ContactToHost\n        spacseOffer(_id: String) : SpacseOffer\n        spacseTour(_id: String) : SpacseTour\n        spacseOrderBook(_id: String) : SpacseOrderBook\n        event(_id: String) : Event\n        properyBookingDuration(_id: String) : ProperyBookingDuration\n        properyCapacity(_id: String) : ProperyCapacity\n        amenity(_id: String) : Amenities\n        spacseAmenity(_id: String) : SpacseAmenities\n        spacseAvaibility(_id: String) : SpacseAvaibilities\n        spacsePhotoGallery(_id: String) : SpacsePhotoGallery\n        pricingLayer(_id: String) : PricingLayer\n        budget(_id: String) : Budget\n        accountsetting(_id: String) : UserAccountSetting\n        requestview(_id: String) : RequestView\n        bookings(_id: String): Booking\n        favourites(_id: String) : Favourite\n        \n        paymentmethod(_id: String): PaymentMethod\n  \n        filterSpacses(capacity: [String], category: [String], city: String, state: String,  minPrice: Float, maxPrice: Float, minCapacity: Float, maxCapacity: Float) : [Spacse] \n        filterRequests(capacity: [String], category: [String], city: String, state: String, limit: Int, pageNo: Int) : [Request]\n        paymentmethods: [PaymentMethod]\n        favourites : [Favourite]\n        bookings: [Booking]\n        requestviews : [RequestView]\n        users: [User]\n        requests: [Request]\n        userRequests(userId: String): [Request]\n        categories: [Category]\n        comments: [Comment]\n        userSocialMedias: [UserSocialMedia]\n        loginSessions: [LoginSession]\n        userPaymentInfos: [UserPaymentInfo]\n        requestFlags: [RequestFlag]\n        requestTransactions: [RequestTransaction]\n        spacses: [Spacse]\n        messageHistories: [MessageHistory]\n        contactToHosts: [ContactToHost]\n        spacseOffers: [SpacseOffer]\n        spacseTours: [SpacseTour]\n        spacseOrderBooks: [SpacseOrderBook]\n        events: [Event]\n        properyBookingDurations: [ProperyBookingDuration]\n        properyCapacities: [ProperyCapacity]\n        requestFlags: [RequestFlag]\n        requestTransactions: [RequestTransaction]\n        spacses( limit : Int, offset: Int): [Spacse]\n        amenities: [Amenities]\n        spacseAmenities: [SpacseAmenities]\n        spacseAvaibilities: [SpacseAvaibilities]\n        spacsePhotoGalleries: [SpacsePhotoGallery]\n        pricingLayers: [PricingLayer]\n        budgets:[Budget]\n        accountsettings : [UserAccountSetting]\n        messages(userId: String) : [Message] \n        profileMessages(userId: String) : [Message]\n        getFullMessageHistoryForUser(senderId: String!, requestId: String!, receiverId: String!, time : String) : [Message]\n\n        updateCapacity : [ProperyCapacity]\n        updatePrice : [ProperyCapacity]\n        getAllSpace(limit: Int, offset: Int) : [Spacse]\n        getPendingSpace(userId: String) : [Spacse]\n        getApprovedSpace(userId: String) : [Spacse]\n        getInProcessSpace(userId: String) : [Spacse]\n        spacseForEdit(_id: String, userId: String) : Spacse\n        getSpacebookings(userId: String) : [Booking]\n        getSimilerRequest(limit : Int, categoryId : String) : [Request]\n        getBookingStatistics(userId: String) : BookingStatistics\n        getStatistics(userId: String) : Statistics\n        getStatisticsByMonth(userId: String): Statistics\n        getStatisticsByLastMonth(userId: String): Statistics\n        getStatisticsByYear(userId: String):Statistics \n        getUpcomingBookings(userId: String) : [Booking]\n        getTopRatedSpaces: [Spacse]\n        searchSpaceByTitle(keyWord : String) : [Spacse]\n        similerSpasce(categoryId : String) : [Spacse]\n        getTopEventSpaces: [Spacse]\n        getTopCreativeSpaces: [Spacse] \n        latestRequests : [Request] \n\n      }\n    \n      type Favourite{\n        _id: String\n        userId: String\n        spacseId: String\n        user : User\n        spacse: Spacse\n\n     \n      }\n\n      type PaymentMethod{\n        _id: String\n        userId: String\n        accounttype: String\n        firstName: String\n        lastName: String\n        routingNo: String\n        accountNo: String\n        user: User\n      }\n\n      type User {\n        _id: String\n        firstName: String\n        lastName: String\n        email: String\n        dateOfBirth: String\n        password: String\n        status: String\n        mobile: String\n        about: String\n        profilePic : String\n        requests: [Request]\n        comments: [Comment]\n        socialMedias: [UserSocialMedia]\n        loginSessions: [LoginSession]\n        userPaymentInfo: UserPaymentInfo\n        requestFlags: [RequestFlag]\n        requestTransactions: [RequestTransaction]\n        spacses: [Spacse]\n        messageHistories: [MessageHistory]\n        contactToHosts: [ContactToHost]\n        spacseOffers: [SpacseOffer]\n        spacseTours: [SpacseTour]\n        orders: [SpacseOrderBook]\n        bookings: [Booking]\n        events: [Event]\t\n        accountsetting : UserAccountSetting\n        paymentmethods : [PaymentMethod]\n        favourites : [Favourite]\n        \n      }\n\n      type UserAccountSetting{\n        _id: String\n        userId: String\n        smsNotification: String\n        generalNotification: String\n        reservationNotification: String\n        accountNotification: String\n        user: User\n      }\n\n       type UserSocialMedia{\n        _id: String\n        userId: String\n        socialMediaName: String\n        socialMediaId: String\n        token: String\n        user: User\n      }\n\n      type LoginSession{\n        _id: String\n        userId: String\n        session: String\n        user: User\n      }\n      type Budget{\n        _id: String\n        title: String\n        minimum: String\n        maximum: String\n     }\n     type SpaceCategories{\n      _id: String\n      spacseId: String\n      categoryId: String\n      spacse: Spacse\n      category: Category\n     }\n\n     type UserPaymentInfo{\n        _id: String\n        paymentType: String\n        userId: String\n        email: String\n        paypalId: String\n        spacseId: String\n        createdAt: String\n        updatedAt: String\n        status: String\n        user: User\n        bankInfo: String\n        routingNo: String\n        accounttype: String\n        accountNo: String\n     }\n  \n      type ProperyCapacity{\n        _id: String\n        title: String\n        minimumValue: Float\n        maximumValue: Float\n        status: String\n        request: [Request]\n        spacses: [Spacse]\n\n      }\n\n      type ProperyBookingDuration{ \n        _id: String\n        duration: String\n      }\n\n      type Category {\n        _id: String\n        title: String\n        status: String\n        requests: [Request]\n        spacses: [Spacse]\n      }\n      \n      type RequestView{\n        _id: String\n        requestId : String\n        userId: String\n        view : String\n      }\n       type Request {\n        _id: String\n        userId : String \n        startDate : String\n        endDate : String\n        address : String\n        createdAt: String\n        city : String\n        state : String\n        country : String\n        otherCategoryTitle : String\n        categoryId : String\n        capacityId : String\n        budgetId : String\n        description : String\n        timeDuration : String\n        status : String\n        category: Category\n        capacity: ProperyCapacity\n        user: User\n        budget: Budget\n        comments: [Comment]\n        messages(loginUserId: String): [Message]\n        flags: [RequestFlag]\n        requestTransactions: [RequestTransaction]\n        spaces(loginUserId: String): [RequestsSpacse]\n      }\n\n      type RequestFlag{\n        _id: String\n        flagId: String\n        reasons: String\n        userId: String\n        type: String\n        createdAt: String\n        user: User\n        request: Request\n      }\n\n      type Comment {\n        _id: String\n        userId: String\n        requestId: String\n        comment: String\n        photoUrl: String\n        commentType: String\n        transactionId: String\n        repliedToCommentId: String\n        createdAt: String\n        request: Request\n        spacse: Spacse\n        user: User\n        replies: [Comment]\n        requestTransaction: RequestTransaction\n      }\n\n      type Message {\n        _id: String\n        senderId: String\n        receiverId: String\n        requestId: String\n        spacseId: String\n        comment: String\n        photoUrl: String\n        messageType: String\n        transactionId: String\n        tourId : String\n        repliedToMessageId: String\n        createdAt: String\n        request: Request\n        spacse : Spacse\n        sender: User\n        receiver: User\n        replies: [Message]\n        requestTransaction: [RequestTransaction]\n        tour: [SpacseTour]\n      }\n\n      type RequestTransaction\t{\n        _id: String\n        userId: String\n        requestId: String\n        amount: String\n        reason: String\n        transactionType: String\n        transactionInfo: String\n        status: String\n        requestTransactionId: String\n        createdAt: String\n        updatedAt: String\n        request: Request\n        user: User\n        message: Message\n      }\n      type RequestsSpacse{\n        _id: String\n        userId: String\n        requestId : String\n        spacseId : String\n        spaceLink : String\n        description : String\n        createdAt : Float\n        user: User\n        request: Request\n        spacse : Spacse\n      }\n      type Spacse{\n        _id: String\n        userId: String\n        categoryId: String\n        capacityId: String\n        numberOfRooms: String\n        numberOfRestRooms: String\n        squareFootArea: String\n        address: String\n        city: String\n        state: String\n        country: String  \n        latitude: String\n        longitude: String\n        title: String\n        subTitle: String\n        description: String\n        coverPictire: String\n        status: String\n        securityDeposit: String\n        additionalFees: String\n        isPrivate : String\n        createdAt: Float\n        updatedAt: Float    \n        category: Category\n        capacity: ProperyCapacity\n        user: User\n        userPaymentInfo: UserPaymentInfo\n        comments(limit: Int, offset: Int): [Comment]\n        flags(limit: Int, offset: Int): [RequestFlag] \n        spacseamenities(limit: Int, offset: Int): [SpacseAmenities]\n        avaibilities(limit: Int, offset: Int): [SpacseAvaibilities]\n        spacsePhotoGallery(limit: Int, offset: Int): [SpacsePhotoGallery]\n        pricingLayer(limit: Int, offset: Int): [PricingLayer]\n        messageHistories(limit: Int, offset: Int): [MessageHistory]\n        spacseOffers(limit: Int, offset: Int): [SpacseOffer]\n        spacseTours(limit: Int, offset: Int): [SpacseTour]\n        orders(limit: Int, offset: Int): [SpacseOrderBook]\n        bookings(limit:Int, offset: Int):[Booking]\n        favourites(limit:Int,offset: Int): [Favourite]\n        spaceCategories :[SpaceCategories]\n      }\n\n      type Amenities\t {\n        _id: String\n        title: String\n        status: String\n        spacse: [SpacseAmenities]\n      }\n\n      type SpacseAmenities\t {\n        _id: String\n        amenitiesId: String\n        spacseId: String\n        amenities: Amenities\n        spacse: Spacse\n      }  \n\n      type SpacseAvaibilities\t{\n        _id: String\n        spacseId: String\n        days: String\n        startTime: String\n        endTime: String\n        spacse: Spacse\n      }\n\n      type SpacsePhotoGallery\t{\n        _id: String\n        propertyId: String\n        imageUrl: String\n        status: String\n        position: String\n        spacse: Spacse\n      }\n\n      input PricingLayerInput{\n          spacseId: String\n          timeFrame: String\n          timeFrameType: String\n          rate: Float\n          status: String\n      }\n\n      input AvaibilityTimeInput{\n        days : String\n        startTime: String\n        endTime: String\n      }\n\n      type PricingLayer{\n          _id: String\n          spacseId: String\n          timeFrame: String\n          timeFrameType: String\n          rate: Float\n          status: String\n          spacse: Spacse\n      }\n      \n      type MessageHistory{\n        _id: String\n        senderId: String\n        receiverId: String\n        spacseId: String\n        status: String\n        message: String\n        createdAt: String\n        messageId: String\n        spacse: Spacse\n        sender: User\n        reciever: User\n        spacse: Spacse\n        replies: [MessageHistory]\n      }\n      \n      type ContactToHost{\n        _id: String\n        spacseId: String\n        userId: String\n        startDate: String \n        endDate: String\n        isDateFlexible: String\n        comment: String\n        createdAt: String\n        status: String\n        user: User\n        spacse: Spacse\n      }\n\n      type SpacseOffer{\n        _id: String\n        userId: String\n        spacseId: String\n        startDate: String\n        endDate: String\n        hoursNeeded: String\n        offerPrice: String\n        status: String\n        createdAt: String\n        updatedAt: String\n        user: User\n        spacse: Spacse\n      }\n      \n      type SpacseTour{\n        _id: String\n        userId: String\n        propertyId: String\n        propertyType: String\n        tourDate: String\n        startTime: String\n        endTime: String\n        createdAt: String\n        updatedAt: String\n        status: String\n        user: User\n        request: Request\n        spacse: Spacse\n      }\n      type SpacseOrderBook {\n        _id: String\n        spacseId: String\n        startDate: String\n        endDate: String\n        pricingLayerId: String\n        status: String\n        startTime: String\n        endTime: String\n        paymentStatus: String\n        createdAt: String\n        updatedAt: String\n        user: User\n        spacse: Spacse\n        pricingLayer: PricingLayer\n      }\n\n      type SpaceList{\n        totalRecord : Int\n        spaces: [Spacse]\n      }\n      type Response{\n        code: String\n        message: String\n        id: String\n      }  \n\n      type Statistics{\n        code: String\n        message: String\n        totalBookings : Int\n        totalRevenue : Float\n        avgRevenue: Float\n      }\n      type BookingStatistics{\n        code: String\n        message: String\n        totalRecords : Int\n        totalInquiry : Int\n        totalTours : Int\n        totalOffers : Int\n      }\n      \n      type Event{\n          _id: String\n          title: String\n          startDate: String\n          endDate: String\n          createdAt: String\n          userId: String\n          user: User\n      }\n      type Booking{\n        _id: String\n        userId : String\n        spaceId : String\n        amount : Float\n        reason : String\n        token : String\n        paymentId : String\n        startDate : String\n        endDate : String\n        timeFrame : String\n        timeFrameType : String\n        transactionId : String\n        status : String\n        paymentStatus: String\n        rate : Float\n        createdAt: Float\n        updateAt: Float\n        user: User\n        spacse: Spacse\n      }\n\n\n      type Mutation {\n        createUser( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String): Response\n        createUserSocialMedia(userId: String, socialMediaName: String, socialMediaId: String, token: String ): UserSocialMedia\n        createLoginSession(userId: String, session: String ): LoginSession\n        createUserPaymentInfo(paymentType: String ,spacseId: String, userId: String, paypalId: String, bankInfo: String, routingNo: String, accounttype: String, accountNo: String, createdAt: String, updatedAt: String, status: String,email: String):  UserPaymentInfo\n        createProperyCapacity(title: String, minimumValue: Float, maximumValue: Float, status: String ): ProperyCapacity\n        createProperyBookingDuration( duration: String ): ProperyBookingDuration\n        createCategory( title: String, status: String ): Category\n        createRequest(userId: String, startDate: String, endDate: String, address: String, city: String, state: String, country: String, otherCategoryTitle: String, categoryId: String, capacityId: String, budgetId: String, description: String, timeDuration: String, status: String): Request\n        createRequestFlag(flagId: String, reasons: String, userId: String,type: String): RequestFlag\n        createComment(userId: String, requestId: String, comment: String, photoUrl: String, commentType: String, transactionId: String, repliedToCommentId: String ): Comment\n        createMessage(senderId: String, receiverId: String, spacseId: String tourId: String, requestId: String, comment: String, photoUrl: String, messageType: String, transactionId: String, repliedToMessageId: String, transactionId: String): Message\n        createRequestTransaction (userId: String, requestId: String, amount: String, reason: String, transactionType: String, transactionInfo: String, status: String, requestTransactionId: String ): RequestTransaction\n        createSpacse(_id : String, userId: String, categoryId: String, capacityId: String, numberOfRooms: String, numberOfRestRooms: String, squareFootArea: String, address: String, city: String, state: String, country: String, latitude: String, longitude: String, title: String, subTitle: String, description: String, coverPictire: String, status: String, securityDeposit: String, additionalFees: String, createdAt: String, updatedAt: String, aminities: [String], avaibilities : [AvaibilityTimeInput]): Spacse\n        createAmenities\t(title: String!, status: String!): Amenities\n        createSpacseAmenities (amenitiesIds: [String], spacseId: String): [SpacseAmenities]\n        createSpacseAvaibilities (spacseId: String, days: String, startTime: String, endTime: String ): SpacseAvaibilities\n        createSpacsePhotoGallery (propertyId: String, imageUrl: String, status: String, position: String ): SpacsePhotoGallery\n        createPricingLayer(spacseId: String, timeFrame: String, timeFrameType: String, rate: Float, status: String ): PricingLayer\n        createMessageHistory(senderId: String, receiverId: String, spacseId: String, message: String, messageId: String): MessageHistory\n        createContactToHost( spacseId: String, userId: String, startDate: String, endDate: String, isDateFlexible: String, comment: String, createdAt: String, status: String ): ContactToHost\n        createSpacseOffer(userId: String, spacseId: String, startDate: String, endDate: String, hoursNeeded: String, offerPrice: String, status: String,createdAt: String ): SpacseOffer\n        createSpacseTour(userId: String, propertyId: String, propertyType: String tourDate: String, startTime: String, endTime: String, status: String): SpacseTour\n        createSpacseOrderBook(spacseId: String, startDate: String, endDate: String, pricingLayerId: String, status: String, startTime: String, endTime: String, paymentStatus: String): SpacseOrderBook\n        createEvent(title: String, startDate: String, endDate: String,userId: String): Event     \n        createBudget( title: String, minimum: String, maximum: String) : Budget\n        createUserAccountSetting(userId: String, smsNotification: String, generalNotification: String, reservationNotification: String, accountNotification: String) : Response\n        createPaymentMethod(userId: String, accounttype: String, firstName: String ,lastName: String ,routingNo: String,accountNo: String) : PaymentMethod\n\n\n        updatePrice(pricing: [PricingLayerInput]) :Response\n        updateSecurityDeposit(spacseId: String, securityDeposit: String) :Response\n        updateAdditionalFees(spacseId: String, additionalFees: String) :Response\n        uploadImages(spacseId: String, coverPic : String , photoGellary: [String]) :Response\n        updateUser(_id: String, firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, mobile: String, about: String, profilePic : String  ): Response\n        updatePassword(_id: String, oldpassword: String, newpassword: String, confirmpassword: String): Response\n        updateRequest(_id: String, userId : String, startDate : String, endDate : String, address : String, city : String, state : String, country : String, otherCategoryTitle : String, categoryId : String, capacityId : String, budgetId : String, description : String, timeDuration : String,  status : String): Response\n        updateRequestCounter(requestId: String,userId: String) : Response\n        doPayment(userId: String, token: String, requestId: String, amount: String, reason: String, transactionType: String, transactionInfo: String, status: String, requestTransactionId: String) : Response\n        submitForApproval(spacseId: String, status: String) : Response\n\n\n        loginWithFacebook( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, fbid: String): LoginSession\n        loginWithGoogle( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, gid: String, profilePic: String): LoginSession\n        signUpLinkedIN( firstName: String, lastName: String, email: String, password: String, status: String, dateOfBirth: String, likedInId: String, profilePic: String): LoginSession\n\n\n        createSpaceStep1(spacseId: String, userId: String, categoryId: [String]) : Response\n        createSpaceStep2(spacseId: String, userId: String, capacityId: String, numberOfRooms: String, numberOfRestRooms: String, squareFootArea: String) : Response\n        createSpaceStep3(spacseId: String, userId: String, aminities: [String]) : Response\n        createSpaceStep4(spacseId: String, userId: String, address: String, state: String, city: String, country: String, latitude: String, longitude: String) : Response\n        createSpaceStep5(spacseId: String, userId: String, avaibilities: [AvaibilityTimeInput]) : Response\n        createSpaceStep6(spacseId: String, userId: String, title :String, subTitle: String, description: String) : Response\n        createSpaceStep7(spacseId: String, userId: String, categoryId: String) : Response\n        createSpaceStep8(spacseId: String, userId: String, categoryId: String) : Response\n        createFavourite(spacseId: String, userId: String) : Response\n        setPrivate(spacseId: String, isPrivate: String) : Response\n\n        bookSpacse(userId : String, spaceId : String, amount : Float, reason : String, token : String, startDate : String, endDate : String, timeFrame : String, timeFrameType : String, rate : Float): Response\n\n        updateStatus(spacseIds: [String], status: String) : Response\n        updateBookingStatus(id: String, status: String) : Response\n\n        submitSpacesForRequest(requestId: String, userId: String, spacsesId: [String], spaceLink : String, description : String) : Response\n      }\n\n      schema {\n        query: Query\n        mutation: Mutation\n      }\n    '];

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

          resolvers = {
            Query: (_Query = {

              similerSpasce: function similerSpasce(root, _ref) {
                var categoryId = _ref.categoryId;
                var filter;
                return regeneratorRuntime.async(function similerSpasce$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        filter = {};

                        filter.status = "Active";
                        filter.categoryId = categoryId;
                        _context.next = 5;
                        return regeneratorRuntime.awrap(Spacses.find(filter).sort({ "createdAt": -1 }).limit(10).toArray());

                      case 5:
                        _context.t0 = prepare;
                        return _context.abrupt('return', _context.sent.map(_context.t0));

                      case 7:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, null, undefined);
              },
              searchSpaceByTitle: function searchSpaceByTitle(root, _ref2) {
                var keyWord = _ref2.keyWord;
                var filter;
                return regeneratorRuntime.async(function searchSpaceByTitle$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        filter = {};

                        filter.status = "Active";
                        filter.title = new RegExp(keyWord, 'i');
                        _context2.next = 5;
                        return regeneratorRuntime.awrap(Spacses.find(filter).sort({ "createdAt": -1 }).limit(10).toArray());

                      case 5:
                        _context2.t0 = prepare;
                        return _context2.abrupt('return', _context2.sent.map(_context2.t0));

                      case 7:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, null, undefined);
              },
              getTopRatedSpaces: function getTopRatedSpaces(root) {
                var filter;
                return regeneratorRuntime.async(function getTopRatedSpaces$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        filter = {};

                        filter.status = "Active";
                        _context3.next = 4;
                        return regeneratorRuntime.awrap(Spacses.find(filter).sort({ "createdAt": -1 }).limit(10).toArray());

                      case 4:
                        _context3.t0 = prepare;
                        return _context3.abrupt('return', _context3.sent.map(_context3.t0));

                      case 6:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, null, undefined);
              },
              getTopEventSpaces: function getTopEventSpaces(root) {
                var categoryFilter, category, filter;
                return regeneratorRuntime.async(function getTopEventSpaces$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        categoryFilter = { title: "Event" };
                        _context4.t0 = prepare;
                        _context4.next = 4;
                        return regeneratorRuntime.awrap(Categories.findOne(categoryFilter));

                      case 4:
                        _context4.t1 = _context4.sent;
                        category = (0, _context4.t0)(_context4.t1);
                        filter = {};

                        filter.status = "Active";
                        filter.categoryId = category._id;
                        _context4.next = 11;
                        return regeneratorRuntime.awrap(Spacses.find(filter).sort({ "createdAt": -1 }).limit(10).toArray());

                      case 11:
                        _context4.t2 = prepare;
                        return _context4.abrupt('return', _context4.sent.map(_context4.t2));

                      case 13:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, null, undefined);
              },
              getTopCreativeSpaces: function getTopCreativeSpaces(root) {
                var categoryFilter, category, filter;
                return regeneratorRuntime.async(function getTopCreativeSpaces$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        categoryFilter = { title: "Creative" };
                        _context5.t0 = prepare;
                        _context5.next = 4;
                        return regeneratorRuntime.awrap(Categories.findOne(categoryFilter));

                      case 4:
                        _context5.t1 = _context5.sent;
                        category = (0, _context5.t0)(_context5.t1);
                        filter = {};

                        filter.status = "Active";
                        filter.categoryId = category._id;
                        _context5.next = 11;
                        return regeneratorRuntime.awrap(Spacses.find(filter).sort({ "createdAt": -1 }).limit(10).toArray());

                      case 11:
                        _context5.t2 = prepare;
                        return _context5.abrupt('return', _context5.sent.map(_context5.t2));

                      case 13:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, null, undefined);
              },
              latestRequests: function latestRequests(root) {
                var filter;
                return regeneratorRuntime.async(function latestRequests$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        filter = {};
                        _context6.next = 3;
                        return regeneratorRuntime.awrap(Request.find(filter).sort({ "createdAt": -1 }).limit(10).toArray());

                      case 3:
                        _context6.t0 = prepare;
                        return _context6.abrupt('return', _context6.sent.map(_context6.t0));

                      case 5:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, null, undefined);
              },

              getAllSpace: function getAllSpace(root, _ref3) {
                var limit = _ref3.limit,
                    offset = _ref3.offset;
                var filter;
                return regeneratorRuntime.async(function getAllSpace$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        filter = {};

                        filter.status = { $in: ["Pending", "Active", "Rejected"] };
                        _context7.next = 4;
                        return regeneratorRuntime.awrap(Spacses.find(filter).skip(offset).limit(limit).toArray());

                      case 4:
                        _context7.t0 = prepare;
                        return _context7.abrupt('return', _context7.sent.map(_context7.t0));

                      case 6:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, null, undefined);
              },
              getSimilerRequest: function getSimilerRequest(root, _ref4) {
                var limit = _ref4.limit,
                    categoryId = _ref4.categoryId;
                var filter;
                return regeneratorRuntime.async(function getSimilerRequest$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        filter = {};

                        filter.categoryId = categoryId;
                        _context8.next = 4;
                        return regeneratorRuntime.awrap(Requests.find(filter).skip(0).limit(limit).toArray());

                      case 4:
                        _context8.t0 = prepare;
                        return _context8.abrupt('return', _context8.sent.map(_context8.t0));

                      case 6:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, null, undefined);
              },
              getSpacebookings: function getSpacebookings(root, _ref5) {
                var userId = _ref5.userId;
                var filter, spaces, spaceIds, i;
                return regeneratorRuntime.async(function getSpacebookings$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        filter = {};

                        filter.userId = userId;
                        _context9.next = 4;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 4:
                        _context9.t0 = prepare;
                        spaces = _context9.sent.map(_context9.t0);
                        spaceIds = [];

                        for (i = 0; i < spaces.length; i++) {
                          spaceIds.push(spaces[i]._id);
                        }
                        filter = {};
                        filter.spaceId = { $in: spaceIds };
                        _context9.next = 12;
                        return regeneratorRuntime.awrap(Bookings.find(filter).toArray());

                      case 12:
                        _context9.t1 = prepare;
                        return _context9.abrupt('return', _context9.sent.map(_context9.t1));

                      case 14:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, null, undefined);
              },
              getPendingSpace: function getPendingSpace(root, _ref6) {
                var userId = _ref6.userId;
                var filter;
                return regeneratorRuntime.async(function getPendingSpace$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        filter = {};

                        filter.status = "Pending";
                        filter.userId = userId;
                        _context10.next = 5;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 5:
                        _context10.t0 = prepare;
                        return _context10.abrupt('return', _context10.sent.map(_context10.t0));

                      case 7:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, null, undefined);
              },
              getApprovedSpace: function getApprovedSpace(root, _ref7) {
                var userId = _ref7.userId;
                var filter;
                return regeneratorRuntime.async(function getApprovedSpace$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        filter = {};

                        filter.status = "Active";
                        filter.userId = userId;
                        _context11.next = 5;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 5:
                        _context11.t0 = prepare;
                        return _context11.abrupt('return', _context11.sent.map(_context11.t0));

                      case 7:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, null, undefined);
              },
              getInProcessSpace: function getInProcessSpace(root, _ref8) {
                var userId = _ref8.userId;
                var filter;
                return regeneratorRuntime.async(function getInProcessSpace$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        filter = {};

                        filter.status = "In Process";
                        filter.userId = userId;
                        _context12.next = 5;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 5:
                        _context12.t0 = prepare;
                        return _context12.abrupt('return', _context12.sent.map(_context12.t0));

                      case 7:
                      case 'end':
                        return _context12.stop();
                    }
                  }
                }, null, undefined);
              },
              spacseForEdit: function spacseForEdit(root, _ref9) {
                var _id = _ref9._id,
                    userId = _ref9.userId;
                var filter;
                return regeneratorRuntime.async(function spacseForEdit$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        filter = {};

                        filter._id = (0, _mongodb.ObjectId)(_id);
                        filter.userId = userId;
                        _context13.t0 = prepare;
                        _context13.next = 6;
                        return regeneratorRuntime.awrap(Spacses.findOne(filter));

                      case 6:
                        _context13.t1 = _context13.sent;
                        return _context13.abrupt('return', (0, _context13.t0)(_context13.t1));

                      case 8:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, null, undefined);
              },

              updateCapacity: function updateCapacity(root, _ref10) {
                var email = _ref10.email,
                    password = _ref10.password;
                var capacity, i, spacses;
                return regeneratorRuntime.async(function updateCapacity$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.next = 2;
                        return regeneratorRuntime.awrap(ProperyCapacities.find({}).skip(0).limit(50).toArray());

                      case 2:
                        capacity = _context14.sent;
                        i = 0;

                      case 4:
                        if (!(i < capacity.length)) {
                          _context14.next = 12;
                          break;
                        }

                        capacity[i].minimumValue = Number(capacity[i].minimumValue);
                        capacity[i].maximumValue = Number(capacity[i].maximumValue);
                        _context14.next = 9;
                        return regeneratorRuntime.awrap(ProperyCapacities.update({ _id: (0, _mongodb.ObjectId)(capacity[i]._id) }, capacity[i]));

                      case 9:
                        i++;
                        _context14.next = 4;
                        break;

                      case 12:
                        _context14.next = 14;
                        return regeneratorRuntime.awrap(PricingLayers.find({}).skip(0).toArray());

                      case 14:
                        spacses = _context14.sent;
                        i = 0;

                      case 16:
                        if (!(i < spacses.length)) {
                          _context14.next = 23;
                          break;
                        }

                        spacses[i].rate = Number(spacses[i].rate);
                        _context14.next = 20;
                        return regeneratorRuntime.awrap(PricingLayers.update({ _id: (0, _mongodb.ObjectId)(spacses[i]._id) }, spacses[i]));

                      case 20:
                        i++;
                        _context14.next = 16;
                        break;

                      case 23:
                        return _context14.abrupt('return', capacity);

                      case 24:
                      case 'end':
                        return _context14.stop();
                    }
                  }
                }, null, undefined);
              },
              login: function login(root, _ref11) {
                var email = _ref11.email,
                    password = _ref11.password;
                var user, LSdata, res;
                return regeneratorRuntime.async(function login$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        console.log(email);
                        console.log(password);

                        _context15.t0 = prepare;
                        _context15.next = 5;
                        return regeneratorRuntime.awrap(Users.findOne({ "email": email, "password": password }));

                      case 5:
                        _context15.t1 = _context15.sent;
                        user = (0, _context15.t0)(_context15.t1);

                        if (!user) {
                          _context15.next = 15;
                          break;
                        }

                        console.log(user);
                        LSdata = { 'userId': user._id, session: new Date().toISOString() };
                        _context15.next = 12;
                        return regeneratorRuntime.awrap(LoginSessions.insert(LSdata));

                      case 12:
                        res = _context15.sent;

                        console.log(res);
                        return _context15.abrupt('return', res.ops[0]);

                      case 15:
                        return _context15.abrupt('return', "");

                      case 16:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                }, null, undefined);
              },

              user: function user(root, _ref12) {
                var _id = _ref12._id;
                return regeneratorRuntime.async(function user$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.t0 = prepare;
                        _context16.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_id)));

                      case 3:
                        _context16.t1 = _context16.sent;
                        return _context16.abrupt('return', (0, _context16.t0)(_context16.t1));

                      case 5:
                      case 'end':
                        return _context16.stop();
                    }
                  }
                }, null, undefined);
              },

              getBookingStatistics: function getBookingStatistics(root, _ref13) {
                var userId = _ref13.userId;
                var filter, spaces, spaceIds, i, bookings, response, tours, totalOffers;
                return regeneratorRuntime.async(function getBookingStatistics$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        filter = {};

                        filter.userId = userId;
                        _context17.next = 4;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 4:
                        _context17.t0 = prepare;
                        spaces = _context17.sent.map(_context17.t0);
                        spaceIds = [];

                        for (i = 0; i < spaces.length; i++) {
                          spaceIds.push(spaces[i]._id);
                        }
                        filter = {};
                        filter.spaceId = { $in: spaceIds };
                        _context17.next = 12;
                        return regeneratorRuntime.awrap(Bookings.find(filter).toArray());

                      case 12:
                        _context17.t1 = prepare;
                        bookings = _context17.sent.map(_context17.t1);
                        response = {};

                        response.code = 200;
                        response.totalRecords = bookings.length;

                        filter = {};
                        filter.propertyId = { $in: spaceIds };
                        _context17.next = 21;
                        return regeneratorRuntime.awrap(SpacseTours.find(filter).toArray());

                      case 21:
                        _context17.t2 = prepare;
                        tours = _context17.sent.map(_context17.t2);

                        response.totalTours = tours.length;

                        filter = {};
                        filter.spacseId = { $in: spaceIds };
                        _context17.next = 28;
                        return regeneratorRuntime.awrap(SpacseOffers.find(filter).toArray());

                      case 28:
                        _context17.t3 = prepare;
                        totalOffers = _context17.sent.map(_context17.t3);

                        response.totalOffers = totalOffers.length;
                        return _context17.abrupt('return', response);

                      case 32:
                      case 'end':
                        return _context17.stop();
                    }
                  }
                }, null, undefined);
              },
              getStatistics: function getStatistics(root, _ref14) {
                var userId = _ref14.userId;
                var filter, spaces, spaceIds, i, bookings, total_revenue, avg_revenue;
                return regeneratorRuntime.async(function getStatistics$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        filter = {};

                        filter.userId = userId;
                        _context18.next = 4;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 4:
                        _context18.t0 = prepare;
                        spaces = _context18.sent.map(_context18.t0);
                        spaceIds = [];

                        for (i = 0; i < spaces.length; i++) {
                          spaceIds.push(spaces[i]._id);
                        }
                        filter = {};
                        filter.spaceId = { $in: spaceIds };
                        filter.paymentStatus = "Paid";
                        _context18.next = 13;
                        return regeneratorRuntime.awrap(Bookings.find(filter).toArray());

                      case 13:
                        _context18.t1 = prepare;
                        bookings = _context18.sent.map(_context18.t1);

                        if (!(bookings.length > 0)) {
                          _context18.next = 23;
                          break;
                        }

                        total_revenue = 0;

                        for (i = 0; i < bookings.length; i++) {
                          total_revenue = total_revenue + bookings[i].amount;
                        }
                        avg_revenue = 0;

                        avg_revenue = Math.round(total_revenue / bookings.length);

                        return _context18.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue });

                      case 23:
                        return _context18.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 });

                      case 24:
                      case 'end':
                        return _context18.stop();
                    }
                  }
                }, null, undefined);
              },
              getStatisticsByMonth: function getStatisticsByMonth(root, _ref15) {
                var userId = _ref15.userId;
                var currentDate, preMonthDate, filter, spaces, spaceIds, i, bookings, total_revenue, avg_revenue;
                return regeneratorRuntime.async(function getStatisticsByMonth$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        currentDate = new Date();
                        preMonthDate = new Date();

                        preMonthDate.setDate(1);

                        filter = {};

                        filter.userId = userId;
                        _context19.next = 7;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 7:
                        _context19.t0 = prepare;
                        spaces = _context19.sent.map(_context19.t0);
                        spaceIds = [];

                        for (i = 0; i < spaces.length; i++) {
                          spaceIds.push(spaces[i]._id);
                        }
                        filter = {};
                        filter = {
                          '$and': [{ "createdAt": { "$gte": preMonthDate.getTime() } }, { "createdAt": { "$lte": currentDate.getTime() } }, { "spaceId": { "$in": spaceIds } }, { "paymentStatus": { "$eq": "Paid" } }]
                        };

                        _context19.next = 15;
                        return regeneratorRuntime.awrap(Bookings.find(filter).toArray());

                      case 15:
                        _context19.t1 = prepare;
                        bookings = _context19.sent.map(_context19.t1);

                        console.log(bookings);

                        if (!(bookings.length > 0)) {
                          _context19.next = 26;
                          break;
                        }

                        total_revenue = 0;


                        for (i = 0; i < bookings.length; i++) {
                          total_revenue = total_revenue + bookings[i].amount;
                        }
                        avg_revenue = 0;

                        avg_revenue = Math.round(total_revenue / bookings.length);

                        return _context19.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue });

                      case 26:
                        return _context19.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 });

                      case 27:
                      case 'end':
                        return _context19.stop();
                    }
                  }
                }, null, undefined);
              },

              getStatisticsByLastMonth: function getStatisticsByLastMonth(root, _ref16) {
                var userId = _ref16.userId;
                var currentDate, preMonthDate, filter, spaces, spaceIds, i, bookings, total_revenue, avg_revenue;
                return regeneratorRuntime.async(function getStatisticsByLastMonth$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        currentDate = new Date();
                        preMonthDate = new Date();

                        preMonthDate.setMonth(preMonthDate.getMonth() - 1);
                        preMonthDate.setDate(1);
                        currentDate.setDate(1);

                        filter = {};

                        filter.userId = userId;
                        _context20.next = 9;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 9:
                        _context20.t0 = prepare;
                        spaces = _context20.sent.map(_context20.t0);

                        console.log(spaces);
                        spaceIds = [];

                        for (i = 0; i < spaces.length; i++) {
                          spaceIds.push(spaces[i]._id);
                        }
                        filter = {};

                        filter = {
                          '$and': [{ "createdAt": { "$gte": preMonthDate.getTime() } }, { "createdAt": { "$lte": currentDate.getTime() } }, { "spaceId": { "$in": spaceIds } }, { "paymentStatus": { "$eq": "Paid" } }]
                        };
                        _context20.next = 18;
                        return regeneratorRuntime.awrap(Bookings.find(filter).toArray());

                      case 18:
                        _context20.t1 = prepare;
                        bookings = _context20.sent.map(_context20.t1);

                        console.log(bookings);

                        if (!(bookings.length > 0)) {
                          _context20.next = 29;
                          break;
                        }

                        total_revenue = 0;


                        for (i = 0; i < bookings.length; i++) {
                          total_revenue = total_revenue + bookings[i].amount;
                        }
                        avg_revenue = 0;

                        avg_revenue = Math.round(total_revenue / bookings.length);

                        return _context20.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue });

                      case 29:
                        return _context20.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 });

                      case 30:
                      case 'end':
                        return _context20.stop();
                    }
                  }
                }, null, undefined);
              },
              getStatisticsByYear: function getStatisticsByYear(root, _ref17) {
                var userId = _ref17.userId;
                var currentDate, preMonthDate, filter, spaces, spaceIds, i, bookings, total_revenue, avg_revenue;
                return regeneratorRuntime.async(function getStatisticsByYear$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        currentDate = new Date();
                        preMonthDate = new Date();

                        preMonthDate.setDate(1);
                        preMonthDate.setMonth(0);
                        filter = {};

                        filter.userId = userId;
                        _context21.next = 8;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 8:
                        _context21.t0 = prepare;
                        spaces = _context21.sent.map(_context21.t0);
                        spaceIds = [];

                        for (i = 0; i < spaces.length; i++) {
                          spaceIds.push(spaces[i]._id);
                        }
                        filter = {};
                        // filter.spaceId = { $in: spaceIds };
                        // filter.createdAt = { $lte: d.getTime() , $gte: m.getTime() }
                        filter = {
                          '$and': [{ "createdAt": { "$gte": preMonthDate.getTime() } }, { "createdAt": { "$lte": currentDate.getTime() } }, { "spaceId": { "$in": spaceIds } }, { "paymentStatus": { "$eq": "Paid" } }]
                        };

                        _context21.next = 16;
                        return regeneratorRuntime.awrap(Bookings.find(filter).toArray());

                      case 16:
                        _context21.t1 = prepare;
                        bookings = _context21.sent.map(_context21.t1);

                        console.log(bookings);

                        if (!(bookings.length > 0)) {
                          _context21.next = 27;
                          break;
                        }

                        total_revenue = 0;


                        for (i = 0; i < bookings.length; i++) {
                          total_revenue = total_revenue + bookings[i].amount;
                        }
                        avg_revenue = 0;

                        avg_revenue = Math.round(total_revenue / bookings.length);

                        return _context21.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": bookings.length, "totalRevenue": total_revenue, "avgRevenue": avg_revenue });

                      case 27:
                        return _context21.abrupt('return', { "message": "get totalbookings", "code": "200", "totalBookings": 0, "totalRevenue": 0, "avgRevenue": 0 });

                      case 28:
                      case 'end':
                        return _context21.stop();
                    }
                  }
                }, null, undefined);
              },
              getUpcomingBookings: function getUpcomingBookings(root, _ref18) {
                var userId = _ref18.userId;
                var curr, month, year, c1, LastDay, c2, filter, spaces, spaceIds, i, bookings;
                return regeneratorRuntime.async(function getUpcomingBookings$(_context22) {
                  while (1) {
                    switch (_context22.prev = _context22.next) {
                      case 0:
                        curr = new Date();
                        month = curr.getMonth() + 1;
                        year = curr.getFullYear();
                        c1 = year + "-" + month + "-" + curr.getDate();

                        console.log("c1:" + c1);
                        LastDay = new Date(year, month, 0);

                        console.log("LastDay" + LastDay);
                        c2 = year + "-" + month + "-" + LastDay.getDate();

                        console.log("c2:" + c2);

                        filter = {};

                        filter.userId = userId;
                        _context22.next = 13;
                        return regeneratorRuntime.awrap(Spacses.find(filter).toArray());

                      case 13:
                        _context22.t0 = prepare;
                        spaces = _context22.sent.map(_context22.t0);
                        spaceIds = [];

                        for (i = 0; i < spaces.length; i++) {
                          spaceIds.push(spaces[i]._id);
                        }
                        filter = {};
                        /*   filter = {
                             '$and': [
                               { "startDate": { "$gte": c1.toString() } },
                               { "startDate": { "$lte": c2.toString() } },
                               { "spaceId": { "$in": spaceIds } }
                             ]
                           }; */

                        _context22.next = 20;
                        return regeneratorRuntime.awrap(Bookings.find(filter).toArray());

                      case 20:
                        _context22.t1 = prepare;
                        bookings = _context22.sent.map(_context22.t1);

                        if (bookings.length > 0) {
                          console.log(bookings);
                        } else {
                          console.log("There is no any upcoming bookings");
                        }

                      case 23:
                      case 'end':
                        return _context22.stop();
                    }
                  }
                }, null, undefined);
              },

              favourites: function favourites(root, _ref19) {
                return regeneratorRuntime.async(function favourites$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        _objectDestructuringEmpty(_ref19);

                        _context23.next = 3;
                        return regeneratorRuntime.awrap(Favourites.find({}).skip(0).limit(50).toArray());

                      case 3:
                        _context23.t0 = prepare;
                        return _context23.abrupt('return', _context23.sent.map(_context23.t0));

                      case 5:
                      case 'end':
                        return _context23.stop();
                    }
                  }
                }, null, undefined);
              }

            }, _defineProperty(_Query, 'favourites', function favourites(root, _ref20) {
              var _id = _ref20._id;
              return regeneratorRuntime.async(function favourites$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      _context24.t0 = prepare;
                      _context24.next = 3;
                      return regeneratorRuntime.awrap(Favourites.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context24.t1 = _context24.sent;
                      return _context24.abrupt('return', (0, _context24.t0)(_context24.t1));

                    case 5:
                    case 'end':
                      return _context24.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'messages', function messages(root, _ref21) {
              var userId = _ref21.userId;
              return regeneratorRuntime.async(function messages$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      console.log(userId);
                      _context25.next = 3;
                      return regeneratorRuntime.awrap(Messages.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context25.t0 = prepare;
                      return _context25.abrupt('return', _context25.sent.map(_context25.t0));

                    case 5:
                    case 'end':
                      return _context25.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'users', function users(root, _ref22) {
              return regeneratorRuntime.async(function users$(_context26) {
                while (1) {
                  switch (_context26.prev = _context26.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref22);

                      _context26.next = 3;
                      return regeneratorRuntime.awrap(Users.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context26.t0 = prepare;
                      return _context26.abrupt('return', _context26.sent.map(_context26.t0));

                    case 5:
                    case 'end':
                      return _context26.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'request', function request(root, _ref23) {
              var _id = _ref23._id;
              return regeneratorRuntime.async(function request$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      _context27.t0 = prepare;
                      _context27.next = 3;
                      return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context27.t1 = _context27.sent;
                      return _context27.abrupt('return', (0, _context27.t0)(_context27.t1));

                    case 5:
                    case 'end':
                      return _context27.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requests', function requests(root, _ref24) {
              return regeneratorRuntime.async(function requests$(_context28) {
                while (1) {
                  switch (_context28.prev = _context28.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref24);

                      _context28.next = 3;
                      return regeneratorRuntime.awrap(Requests.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context28.t0 = prepare;
                      return _context28.abrupt('return', _context28.sent.map(_context28.t0));

                    case 5:
                    case 'end':
                      return _context28.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'userRequests', function userRequests(root, _ref25) {
              var userId = _ref25.userId;
              return regeneratorRuntime.async(function userRequests$(_context29) {
                while (1) {
                  switch (_context29.prev = _context29.next) {
                    case 0:
                      _context29.next = 2;
                      return regeneratorRuntime.awrap(Requests.find({ userId: userId }).skip(0).limit(50).toArray());

                    case 2:
                      _context29.t0 = prepare;
                      return _context29.abrupt('return', _context29.sent.map(_context29.t0));

                    case 4:
                    case 'end':
                      return _context29.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'comment', function comment(root, _ref26) {
              var _id = _ref26._id;
              return regeneratorRuntime.async(function comment$(_context30) {
                while (1) {
                  switch (_context30.prev = _context30.next) {
                    case 0:
                      _context30.t0 = prepare;
                      _context30.next = 3;
                      return regeneratorRuntime.awrap(Comments.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context30.t1 = _context30.sent;
                      return _context30.abrupt('return', (0, _context30.t0)(_context30.t1));

                    case 5:
                    case 'end':
                      return _context30.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'category', function category(root, _ref27) {
              var _id = _ref27._id;
              return regeneratorRuntime.async(function category$(_context31) {
                while (1) {
                  switch (_context31.prev = _context31.next) {
                    case 0:
                      _context31.t0 = prepare;
                      _context31.next = 3;
                      return regeneratorRuntime.awrap(Categories.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context31.t1 = _context31.sent;
                      return _context31.abrupt('return', (0, _context31.t0)(_context31.t1));

                    case 5:
                    case 'end':
                      return _context31.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'categories', function categories(root, _ref28) {
              return regeneratorRuntime.async(function categories$(_context32) {
                while (1) {
                  switch (_context32.prev = _context32.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref28);

                      _context32.next = 3;
                      return regeneratorRuntime.awrap(Categories.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context32.t0 = prepare;
                      return _context32.abrupt('return', _context32.sent.map(_context32.t0));

                    case 5:
                    case 'end':
                      return _context32.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'request', function request(root, _ref29) {
              var _id = _ref29._id;
              return regeneratorRuntime.async(function request$(_context33) {
                while (1) {
                  switch (_context33.prev = _context33.next) {
                    case 0:
                      _context33.t0 = prepare;
                      _context33.next = 3;
                      return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context33.t1 = _context33.sent;
                      return _context33.abrupt('return', (0, _context33.t0)(_context33.t1));

                    case 5:
                    case 'end':
                      return _context33.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requests', function requests(root, _ref30) {
              return regeneratorRuntime.async(function requests$(_context34) {
                while (1) {
                  switch (_context34.prev = _context34.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref30);

                      _context34.next = 3;
                      return regeneratorRuntime.awrap(Requests.find({}).skip(0).sort({ "createdAt": -1 }).limit(50).toArray());

                    case 3:
                      _context34.t0 = prepare;
                      return _context34.abrupt('return', _context34.sent.map(_context34.t0));

                    case 5:
                    case 'end':
                      return _context34.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'userSocialMedia', function userSocialMedia(root, _ref31) {
              var _id = _ref31._id;
              return regeneratorRuntime.async(function userSocialMedia$(_context35) {
                while (1) {
                  switch (_context35.prev = _context35.next) {
                    case 0:
                      _context35.t0 = prepare;
                      _context35.next = 3;
                      return regeneratorRuntime.awrap(UserSocialMedias.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context35.t1 = _context35.sent;
                      return _context35.abrupt('return', (0, _context35.t0)(_context35.t1));

                    case 5:
                    case 'end':
                      return _context35.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'userSocialMedias', function userSocialMedias(root, _ref32) {
              return regeneratorRuntime.async(function userSocialMedias$(_context36) {
                while (1) {
                  switch (_context36.prev = _context36.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref32);

                      _context36.next = 3;
                      return regeneratorRuntime.awrap(UserSocialMedias.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context36.t0 = prepare;
                      return _context36.abrupt('return', _context36.sent.map(_context36.t0));

                    case 5:
                    case 'end':
                      return _context36.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'loginSession', function loginSession(root, _ref33) {
              var _id = _ref33._id;
              return regeneratorRuntime.async(function loginSession$(_context37) {
                while (1) {
                  switch (_context37.prev = _context37.next) {
                    case 0:
                      _context37.t0 = prepare;
                      _context37.next = 3;
                      return regeneratorRuntime.awrap(LoginSessions.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context37.t1 = _context37.sent;
                      return _context37.abrupt('return', (0, _context37.t0)(_context37.t1));

                    case 5:
                    case 'end':
                      return _context37.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'loginSessions', function loginSessions(root, _ref34) {
              return regeneratorRuntime.async(function loginSessions$(_context38) {
                while (1) {
                  switch (_context38.prev = _context38.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref34);

                      _context38.next = 3;
                      return regeneratorRuntime.awrap(LoginSessions.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context38.t0 = prepare;
                      return _context38.abrupt('return', _context38.sent.map(_context38.t0));

                    case 5:
                    case 'end':
                      return _context38.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'userPaymentInfo', function userPaymentInfo(root, _ref35) {
              var _id = _ref35._id;
              return regeneratorRuntime.async(function userPaymentInfo$(_context39) {
                while (1) {
                  switch (_context39.prev = _context39.next) {
                    case 0:
                      _context39.t0 = prepare;
                      _context39.next = 3;
                      return regeneratorRuntime.awrap(UserPaymentInfos.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context39.t1 = _context39.sent;
                      return _context39.abrupt('return', (0, _context39.t0)(_context39.t1));

                    case 5:
                    case 'end':
                      return _context39.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'userPaymentInfos', function userPaymentInfos(root, _ref36) {
              return regeneratorRuntime.async(function userPaymentInfos$(_context40) {
                while (1) {
                  switch (_context40.prev = _context40.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref36);

                      _context40.next = 3;
                      return regeneratorRuntime.awrap(UserPaymentInfos.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context40.t0 = prepare;
                      return _context40.abrupt('return', _context40.sent.map(_context40.t0));

                    case 5:
                    case 'end':
                      return _context40.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'paymentmethod', function paymentmethod(root, _ref37) {
              var _id = _ref37._id;
              return regeneratorRuntime.async(function paymentmethod$(_context41) {
                while (1) {
                  switch (_context41.prev = _context41.next) {
                    case 0:
                      _context41.t0 = prepare;
                      _context41.next = 3;
                      return regeneratorRuntime.awrap(PaymentMethods.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context41.t1 = _context41.sent;
                      return _context41.abrupt('return', (0, _context41.t0)(_context41.t1));

                    case 5:
                    case 'end':
                      return _context41.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'paymentmethods', function paymentmethods(root, _ref38) {
              return regeneratorRuntime.async(function paymentmethods$(_context42) {
                while (1) {
                  switch (_context42.prev = _context42.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref38);

                      _context42.t0 = prepare;
                      _context42.next = 4;
                      return regeneratorRuntime.awrap(PaymentMethods.find({}).skip(0).limit(50).toArray());

                    case 4:
                      _context42.t1 = _context42.sent;
                      _context42.t2 = prepare;
                      return _context42.abrupt('return', (0, _context42.t0)(_context42.t1).map(_context42.t2));

                    case 7:
                    case 'end':
                      return _context42.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requestFlag', function requestFlag(root, _ref39) {
              var _id = _ref39._id;
              return regeneratorRuntime.async(function requestFlag$(_context43) {
                while (1) {
                  switch (_context43.prev = _context43.next) {
                    case 0:
                      _context43.t0 = prepare;
                      _context43.next = 3;
                      return regeneratorRuntime.awrap(RequestFlags.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context43.t1 = _context43.sent;
                      return _context43.abrupt('return', (0, _context43.t0)(_context43.t1));

                    case 5:
                    case 'end':
                      return _context43.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requestFlags', function requestFlags(root, _ref40) {
              return regeneratorRuntime.async(function requestFlags$(_context44) {
                while (1) {
                  switch (_context44.prev = _context44.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref40);

                      _context44.next = 3;
                      return regeneratorRuntime.awrap(RequestFlags.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context44.t0 = prepare;
                      return _context44.abrupt('return', _context44.sent.map(_context44.t0));

                    case 5:
                    case 'end':
                      return _context44.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requestview', function requestview(root, _ref41) {
              var _id = _ref41._id;
              return regeneratorRuntime.async(function requestview$(_context45) {
                while (1) {
                  switch (_context45.prev = _context45.next) {
                    case 0:
                      _context45.t0 = prepare;
                      _context45.next = 3;
                      return regeneratorRuntime.awrap(RequestViews.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context45.t1 = _context45.sent;
                      return _context45.abrupt('return', (0, _context45.t0)(_context45.t1));

                    case 5:
                    case 'end':
                      return _context45.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requestviews', function requestviews(root, _ref42) {
              return regeneratorRuntime.async(function requestviews$(_context46) {
                while (1) {
                  switch (_context46.prev = _context46.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref42);

                      _context46.next = 3;
                      return regeneratorRuntime.awrap(RequestViews.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context46.t0 = prepare;
                      return _context46.abrupt('return', _context46.sent.map(_context46.t0));

                    case 5:
                    case 'end':
                      return _context46.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requestTransaction', function requestTransaction(root, _ref43) {
              var _id = _ref43._id;
              return regeneratorRuntime.async(function requestTransaction$(_context47) {
                while (1) {
                  switch (_context47.prev = _context47.next) {
                    case 0:
                      _context47.t0 = prepare;
                      _context47.next = 3;
                      return regeneratorRuntime.awrap(RequestTransactions.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context47.t1 = _context47.sent;
                      return _context47.abrupt('return', (0, _context47.t0)(_context47.t1));

                    case 5:
                    case 'end':
                      return _context47.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'requestTransactions', function requestTransactions(root, _ref44) {
              return regeneratorRuntime.async(function requestTransactions$(_context48) {
                while (1) {
                  switch (_context48.prev = _context48.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref44);

                      _context48.next = 3;
                      return regeneratorRuntime.awrap(RequestTransactions.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context48.t0 = prepare;
                      return _context48.abrupt('return', _context48.sent.map(_context48.t0));

                    case 5:
                    case 'end':
                      return _context48.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacse', function spacse(root, _ref45) {
              var _id = _ref45._id;
              return regeneratorRuntime.async(function spacse$(_context49) {
                while (1) {
                  switch (_context49.prev = _context49.next) {
                    case 0:
                      _context49.t0 = prepare;
                      _context49.next = 3;
                      return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context49.t1 = _context49.sent;
                      return _context49.abrupt('return', (0, _context49.t0)(_context49.t1));

                    case 5:
                    case 'end':
                      return _context49.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacses', function spacses(root, _ref46) {
              var limit = _ref46.limit,
                  offset = _ref46.offset;
              var defaultLimit;
              return regeneratorRuntime.async(function spacses$(_context50) {
                while (1) {
                  switch (_context50.prev = _context50.next) {
                    case 0:
                      defaultLimit = 20;

                      if (limit) {
                        defaultLimit = limit;
                      }
                      _context50.next = 4;
                      return regeneratorRuntime.awrap(Spacses.find({ "status": "Active" }).skip(0).limit(defaultLimit).toArray());

                    case 4:
                      _context50.t0 = prepare;
                      return _context50.abrupt('return', _context50.sent.map(_context50.t0));

                    case 6:
                    case 'end':
                      return _context50.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'messageHistory', function messageHistory(root, _ref47) {
              var _id = _ref47._id;
              return regeneratorRuntime.async(function messageHistory$(_context51) {
                while (1) {
                  switch (_context51.prev = _context51.next) {
                    case 0:
                      _context51.t0 = prepare;
                      _context51.next = 3;
                      return regeneratorRuntime.awrap(MessageHistories.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context51.t1 = _context51.sent;
                      return _context51.abrupt('return', (0, _context51.t0)(_context51.t1));

                    case 5:
                    case 'end':
                      return _context51.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'messageHistories', function messageHistories(root, _ref48) {
              return regeneratorRuntime.async(function messageHistories$(_context52) {
                while (1) {
                  switch (_context52.prev = _context52.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref48);

                      _context52.next = 3;
                      return regeneratorRuntime.awrap(MessageHistories.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context52.t0 = prepare;
                      return _context52.abrupt('return', _context52.sent.map(_context52.t0));

                    case 5:
                    case 'end':
                      return _context52.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'contactToHost', function contactToHost(root, _ref49) {
              var _id = _ref49._id;
              return regeneratorRuntime.async(function contactToHost$(_context53) {
                while (1) {
                  switch (_context53.prev = _context53.next) {
                    case 0:
                      _context53.t0 = prepare;
                      _context53.next = 3;
                      return regeneratorRuntime.awrap(ContactToHosts.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context53.t1 = _context53.sent;
                      return _context53.abrupt('return', (0, _context53.t0)(_context53.t1));

                    case 5:
                    case 'end':
                      return _context53.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'contactToHosts', function contactToHosts(root, _ref50) {
              return regeneratorRuntime.async(function contactToHosts$(_context54) {
                while (1) {
                  switch (_context54.prev = _context54.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref50);

                      _context54.next = 3;
                      return regeneratorRuntime.awrap(ContactToHosts.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context54.t0 = prepare;
                      return _context54.abrupt('return', _context54.sent.map(_context54.t0));

                    case 5:
                    case 'end':
                      return _context54.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseOffer', function spacseOffer(root, _ref51) {
              var _id = _ref51._id;
              return regeneratorRuntime.async(function spacseOffer$(_context55) {
                while (1) {
                  switch (_context55.prev = _context55.next) {
                    case 0:
                      _context55.t0 = prepare;
                      _context55.next = 3;
                      return regeneratorRuntime.awrap(SpacseOffers.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context55.t1 = _context55.sent;
                      return _context55.abrupt('return', (0, _context55.t0)(_context55.t1));

                    case 5:
                    case 'end':
                      return _context55.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseOffers', function spacseOffers(root, _ref52) {
              return regeneratorRuntime.async(function spacseOffers$(_context56) {
                while (1) {
                  switch (_context56.prev = _context56.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref52);

                      _context56.next = 3;
                      return regeneratorRuntime.awrap(SpacseOffers.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context56.t0 = prepare;
                      return _context56.abrupt('return', _context56.sent.map(_context56.t0));

                    case 5:
                    case 'end':
                      return _context56.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseTour', function spacseTour(root, _ref53) {
              var _id = _ref53._id;
              return regeneratorRuntime.async(function spacseTour$(_context57) {
                while (1) {
                  switch (_context57.prev = _context57.next) {
                    case 0:
                      _context57.t0 = prepare;
                      _context57.next = 3;
                      return regeneratorRuntime.awrap(SpacseTours.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context57.t1 = _context57.sent;
                      return _context57.abrupt('return', (0, _context57.t0)(_context57.t1));

                    case 5:
                    case 'end':
                      return _context57.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseTours', function spacseTours(root, _ref54) {
              return regeneratorRuntime.async(function spacseTours$(_context58) {
                while (1) {
                  switch (_context58.prev = _context58.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref54);

                      _context58.next = 3;
                      return regeneratorRuntime.awrap(SpacseTours.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context58.t0 = prepare;
                      return _context58.abrupt('return', _context58.sent.map(_context58.t0));

                    case 5:
                    case 'end':
                      return _context58.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseOrderBook', function spacseOrderBook(root, _ref55) {
              var _id = _ref55._id;
              return regeneratorRuntime.async(function spacseOrderBook$(_context59) {
                while (1) {
                  switch (_context59.prev = _context59.next) {
                    case 0:
                      _context59.t0 = prepare;
                      _context59.next = 3;
                      return regeneratorRuntime.awrap(SpacseOrderBooks.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context59.t1 = _context59.sent;
                      return _context59.abrupt('return', (0, _context59.t0)(_context59.t1));

                    case 5:
                    case 'end':
                      return _context59.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseOrderBooks', function spacseOrderBooks(root, _ref56) {
              return regeneratorRuntime.async(function spacseOrderBooks$(_context60) {
                while (1) {
                  switch (_context60.prev = _context60.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref56);

                      _context60.next = 3;
                      return regeneratorRuntime.awrap(SpacseOrderBooks.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context60.t0 = prepare;
                      return _context60.abrupt('return', _context60.sent.map(_context60.t0));

                    case 5:
                    case 'end':
                      return _context60.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'bookings', function bookings(root, _ref57) {
              var _id = _ref57._id;
              return regeneratorRuntime.async(function bookings$(_context61) {
                while (1) {
                  switch (_context61.prev = _context61.next) {
                    case 0:
                      _context61.t0 = prepare;
                      _context61.next = 3;
                      return regeneratorRuntime.awrap(Bookings.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context61.t1 = _context61.sent;
                      return _context61.abrupt('return', (0, _context61.t0)(_context61.t1));

                    case 5:
                    case 'end':
                      return _context61.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'bookings', function bookings(root, _ref58) {
              return regeneratorRuntime.async(function bookings$(_context62) {
                while (1) {
                  switch (_context62.prev = _context62.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref58);

                      _context62.next = 3;
                      return regeneratorRuntime.awrap(Bookings.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context62.t0 = prepare;
                      return _context62.abrupt('return', _context62.sent.map(_context62.t0));

                    case 5:
                    case 'end':
                      return _context62.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'budget', function budget(root, _ref59) {
              var _id = _ref59._id;
              return regeneratorRuntime.async(function budget$(_context63) {
                while (1) {
                  switch (_context63.prev = _context63.next) {
                    case 0:
                      _context63.t0 = prepare;
                      _context63.next = 3;
                      return regeneratorRuntime.awrap(Budgets.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context63.t1 = _context63.sent;
                      return _context63.abrupt('return', (0, _context63.t0)(_context63.t1));

                    case 5:
                    case 'end':
                      return _context63.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'budgets', function budgets(root, _ref60) {
              return regeneratorRuntime.async(function budgets$(_context64) {
                while (1) {
                  switch (_context64.prev = _context64.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref60);

                      _context64.next = 3;
                      return regeneratorRuntime.awrap(Budgets.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context64.t0 = prepare;
                      return _context64.abrupt('return', _context64.sent.map(_context64.t0));

                    case 5:
                    case 'end':
                      return _context64.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'accountsetting', function accountsetting(root, _ref61) {
              var _id = _ref61._id;
              return regeneratorRuntime.async(function accountsetting$(_context65) {
                while (1) {
                  switch (_context65.prev = _context65.next) {
                    case 0:
                      _context65.t0 = prepare;
                      _context65.next = 3;
                      return regeneratorRuntime.awrap(UserAccountSettings.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context65.t1 = _context65.sent;
                      return _context65.abrupt('return', (0, _context65.t0)(_context65.t1));

                    case 5:
                    case 'end':
                      return _context65.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'accountsettings', function accountsettings(root, _ref62) {
              return regeneratorRuntime.async(function accountsettings$(_context66) {
                while (1) {
                  switch (_context66.prev = _context66.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref62);

                      _context66.next = 3;
                      return regeneratorRuntime.awrap(UserAccountSettings.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context66.t0 = prepare;
                      return _context66.abrupt('return', _context66.sent.map(_context66.t0));

                    case 5:
                    case 'end':
                      return _context66.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'event', function event(root, _ref63) {
              var _id = _ref63._id;
              return regeneratorRuntime.async(function event$(_context67) {
                while (1) {
                  switch (_context67.prev = _context67.next) {
                    case 0:
                      _context67.t0 = prepare;
                      _context67.next = 3;
                      return regeneratorRuntime.awrap(Events.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context67.t1 = _context67.sent;
                      return _context67.abrupt('return', (0, _context67.t0)(_context67.t1));

                    case 5:
                    case 'end':
                      return _context67.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'events', function events(root, _ref64) {
              return regeneratorRuntime.async(function events$(_context68) {
                while (1) {
                  switch (_context68.prev = _context68.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref64);

                      _context68.next = 3;
                      return regeneratorRuntime.awrap(Events.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context68.t0 = prepare;
                      return _context68.abrupt('return', _context68.sent.map(_context68.t0));

                    case 5:
                    case 'end':
                      return _context68.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'properyBookingDuration', function properyBookingDuration(root, _ref65) {
              var _id = _ref65._id;
              return regeneratorRuntime.async(function properyBookingDuration$(_context69) {
                while (1) {
                  switch (_context69.prev = _context69.next) {
                    case 0:
                      _context69.t0 = prepare;
                      _context69.next = 3;
                      return regeneratorRuntime.awrap(ProperyBookingDurations.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context69.t1 = _context69.sent;
                      return _context69.abrupt('return', (0, _context69.t0)(_context69.t1));

                    case 5:
                    case 'end':
                      return _context69.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'properyBookingDurations', function properyBookingDurations(root, _ref66) {
              return regeneratorRuntime.async(function properyBookingDurations$(_context70) {
                while (1) {
                  switch (_context70.prev = _context70.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref66);

                      _context70.next = 3;
                      return regeneratorRuntime.awrap(ProperyBookingDurations.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context70.t0 = prepare;
                      return _context70.abrupt('return', _context70.sent.map(_context70.t0));

                    case 5:
                    case 'end':
                      return _context70.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'properyCapacity', function properyCapacity(root, _ref67) {
              var _id = _ref67._id;
              return regeneratorRuntime.async(function properyCapacity$(_context71) {
                while (1) {
                  switch (_context71.prev = _context71.next) {
                    case 0:
                      _context71.t0 = prepare;
                      _context71.next = 3;
                      return regeneratorRuntime.awrap(ProperyCapacities.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context71.t1 = _context71.sent;
                      return _context71.abrupt('return', (0, _context71.t0)(_context71.t1));

                    case 5:
                    case 'end':
                      return _context71.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'properyCapacities', function properyCapacities(root, _ref68) {
              return regeneratorRuntime.async(function properyCapacities$(_context72) {
                while (1) {
                  switch (_context72.prev = _context72.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref68);

                      _context72.next = 3;
                      return regeneratorRuntime.awrap(ProperyCapacities.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context72.t0 = prepare;
                      return _context72.abrupt('return', _context72.sent.map(_context72.t0));

                    case 5:
                    case 'end':
                      return _context72.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'amenity', function amenity(root, _ref69) {
              var _id = _ref69._id;
              return regeneratorRuntime.async(function amenity$(_context73) {
                while (1) {
                  switch (_context73.prev = _context73.next) {
                    case 0:
                      _context73.t0 = prepare;
                      _context73.next = 3;
                      return regeneratorRuntime.awrap(Amenities.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context73.t1 = _context73.sent;
                      return _context73.abrupt('return', (0, _context73.t0)(_context73.t1));

                    case 5:
                    case 'end':
                      return _context73.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'amenities', function amenities(root, _ref70) {
              return regeneratorRuntime.async(function amenities$(_context74) {
                while (1) {
                  switch (_context74.prev = _context74.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref70);

                      _context74.next = 3;
                      return regeneratorRuntime.awrap(Amenities.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context74.t0 = prepare;
                      return _context74.abrupt('return', _context74.sent.map(_context74.t0));

                    case 5:
                    case 'end':
                      return _context74.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseAmenity', function spacseAmenity(root, _ref71) {
              var _id = _ref71._id;
              return regeneratorRuntime.async(function spacseAmenity$(_context75) {
                while (1) {
                  switch (_context75.prev = _context75.next) {
                    case 0:
                      _context75.t0 = prepare;
                      _context75.next = 3;
                      return regeneratorRuntime.awrap(SpacseAmenities.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context75.t1 = _context75.sent;
                      return _context75.abrupt('return', (0, _context75.t0)(_context75.t1));

                    case 5:
                    case 'end':
                      return _context75.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseAmenities', function spacseAmenities(root, _ref72) {
              return regeneratorRuntime.async(function spacseAmenities$(_context76) {
                while (1) {
                  switch (_context76.prev = _context76.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref72);

                      _context76.next = 3;
                      return regeneratorRuntime.awrap(SpacseAmenities.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context76.t0 = prepare;
                      return _context76.abrupt('return', _context76.sent.map(_context76.t0));

                    case 5:
                    case 'end':
                      return _context76.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseAvaibility', function spacseAvaibility(root, _ref73) {
              var _id = _ref73._id;
              return regeneratorRuntime.async(function spacseAvaibility$(_context77) {
                while (1) {
                  switch (_context77.prev = _context77.next) {
                    case 0:
                      _context77.t0 = prepare;
                      _context77.next = 3;
                      return regeneratorRuntime.awrap(SpacseAvaibilities.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context77.t1 = _context77.sent;
                      return _context77.abrupt('return', (0, _context77.t0)(_context77.t1));

                    case 5:
                    case 'end':
                      return _context77.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseTours', function spacseTours(root, _ref74) {
              return regeneratorRuntime.async(function spacseTours$(_context78) {
                while (1) {
                  switch (_context78.prev = _context78.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref74);

                      _context78.next = 3;
                      return regeneratorRuntime.awrap(SpacseAvaibilities.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context78.t0 = prepare;
                      return _context78.abrupt('return', _context78.sent.map(_context78.t0));

                    case 5:
                    case 'end':
                      return _context78.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseAvaibility', function spacseAvaibility(root, _ref75) {
              var _id = _ref75._id;
              return regeneratorRuntime.async(function spacseAvaibility$(_context79) {
                while (1) {
                  switch (_context79.prev = _context79.next) {
                    case 0:
                      _context79.t0 = prepare;
                      _context79.next = 3;
                      return regeneratorRuntime.awrap(SpacseAvaibilities.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context79.t1 = _context79.sent;
                      return _context79.abrupt('return', (0, _context79.t0)(_context79.t1));

                    case 5:
                    case 'end':
                      return _context79.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacseAvaibilities', function spacseAvaibilities(root, _ref76) {
              return regeneratorRuntime.async(function spacseAvaibilities$(_context80) {
                while (1) {
                  switch (_context80.prev = _context80.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref76);

                      _context80.next = 3;
                      return regeneratorRuntime.awrap(SpacseAvaibilities.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context80.t0 = prepare;
                      return _context80.abrupt('return', _context80.sent.map(_context80.t0));

                    case 5:
                    case 'end':
                      return _context80.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacsePhotoGallery', function spacsePhotoGallery(root, _ref77) {
              var _id = _ref77._id;
              return regeneratorRuntime.async(function spacsePhotoGallery$(_context81) {
                while (1) {
                  switch (_context81.prev = _context81.next) {
                    case 0:
                      _context81.t0 = prepare;
                      _context81.next = 3;
                      return regeneratorRuntime.awrap(SpacsePhotoGalleries.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context81.t1 = _context81.sent;
                      return _context81.abrupt('return', (0, _context81.t0)(_context81.t1));

                    case 5:
                    case 'end':
                      return _context81.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'spacsePhotoGalleries', function spacsePhotoGalleries(root, _ref78) {
              return regeneratorRuntime.async(function spacsePhotoGalleries$(_context82) {
                while (1) {
                  switch (_context82.prev = _context82.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref78);

                      _context82.next = 3;
                      return regeneratorRuntime.awrap(SpacsePhotoGalleries.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context82.t0 = prepare;
                      return _context82.abrupt('return', _context82.sent.map(_context82.t0));

                    case 5:
                    case 'end':
                      return _context82.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'pricingLayer', function pricingLayer(root, _ref79) {
              var _id = _ref79._id;
              return regeneratorRuntime.async(function pricingLayer$(_context83) {
                while (1) {
                  switch (_context83.prev = _context83.next) {
                    case 0:
                      _context83.t0 = prepare;
                      _context83.next = 3;
                      return regeneratorRuntime.awrap(PricingLayers.findOne((0, _mongodb.ObjectId)(_id)));

                    case 3:
                      _context83.t1 = _context83.sent;
                      return _context83.abrupt('return', (0, _context83.t0)(_context83.t1));

                    case 5:
                    case 'end':
                      return _context83.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'pricingLayers', function pricingLayers(root, _ref80) {
              return regeneratorRuntime.async(function pricingLayers$(_context84) {
                while (1) {
                  switch (_context84.prev = _context84.next) {
                    case 0:
                      _objectDestructuringEmpty(_ref80);

                      _context84.next = 3;
                      return regeneratorRuntime.awrap(PricingLayers.find({}).skip(0).limit(50).toArray());

                    case 3:
                      _context84.t0 = prepare;
                      return _context84.abrupt('return', _context84.sent.map(_context84.t0));

                    case 5:
                    case 'end':
                      return _context84.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'filterSpacses', function filterSpacses(root, _ref81) {
              var category = _ref81.category,
                  city = _ref81.city,
                  state = _ref81.state,
                  maxPrice = _ref81.maxPrice,
                  minPrice = _ref81.minPrice,
                  minCapacity = _ref81.minCapacity,
                  maxCapacity = _ref81.maxCapacity;
              var filter, capacityFilter, cp, capacity, i, priceFilter, priceLayer, spaceIds;
              return regeneratorRuntime.async(function filterSpacses$(_context85) {
                while (1) {
                  switch (_context85.prev = _context85.next) {
                    case 0:
                      filter = { "status": "Active" };

                      if (category && category.length > 0) {
                        filter.categoryId = { $in: category };
                      }
                      if (city != undefined && city != "") {
                        filter.city = city;
                      }
                      if (state != undefined && state != "") {
                        filter.state = state;
                      }

                      if (!(maxCapacity != undefined && minCapacity != undefined)) {
                        _context85.next = 16;
                        break;
                      }

                      console.log("min" + minCapacity);
                      console.log("max " + maxCapacity);
                      // var capacityFilter = { 
                      //   '$or' : [ 
                      //     { "maximumValue": { "$gte" :  minCapacity , "$lte" : maxCapacity }},
                      //     { "minimumValue": { "$gte" :  minCapacity , "$lte" : maxCapacity }},
                      //     { minCapacity : {  "$gte" :  "$minimumValue" , "$lte" : "$maximumValue" } }
                      //     ]
                      // };

                      capacityFilter = {
                        '$and': [{ "maximumValue": { "$gte": minCapacity } }, { "minimumValue": { "$lte": maxCapacity } }]
                      };

                      //"minimumValue": { "$gte" :  minCapacity , "$lte" : maxCapacity } ,

                      //maximumValue

                      console.log(capacityFilter);
                      _context85.next = 11;
                      return regeneratorRuntime.awrap(ProperyCapacities.find(capacityFilter).skip(0).limit(50).toArray());

                    case 11:
                      _context85.t0 = prepare;
                      cp = _context85.sent.map(_context85.t0);
                      capacity = [];

                      for (i = 0; i < cp.length; i++) {
                        capacity.push(cp[i]._id);
                      }
                      if (capacity && capacity.length > 0) {
                        filter.capacityId = { $in: capacity };
                      }

                    case 16:
                      if (!(maxPrice != undefined && minPrice != undefined)) {
                        _context85.next = 28;
                        break;
                      }

                      priceFilter = {};

                      priceFilter.rate = { "$gte": minPrice, "$lte": maxPrice };
                      priceFilter.timeFrameType = "Day";
                      _context85.next = 22;
                      return regeneratorRuntime.awrap(PricingLayers.find(priceFilter).skip(0).toArray());

                    case 22:
                      _context85.t1 = prepare;
                      priceLayer = _context85.sent.map(_context85.t1);

                      console.log(priceLayer);
                      spaceIds = [];

                      for (i = 0; i < priceLayer.length; i++) {
                        spaceIds.push((0, _mongodb.ObjectId)(priceLayer[i].spacseId));
                      }
                      if (spaceIds && spaceIds.length > 0) {
                        filter._id = { $in: spaceIds };
                      }

                    case 28:

                      console.log(filter);
                      _context85.next = 31;
                      return regeneratorRuntime.awrap(Spacses.find(filter).skip(0).limit(50).toArray());

                    case 31:
                      _context85.t2 = prepare;
                      return _context85.abrupt('return', _context85.sent.map(_context85.t2));

                    case 33:
                    case 'end':
                      return _context85.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'filterRequests', function filterRequests(root, _ref82) {
              var capacity = _ref82.capacity,
                  category = _ref82.category,
                  city = _ref82.city,
                  state = _ref82.state,
                  limit = _ref82.limit,
                  pageNo = _ref82.pageNo;
              var filter, skip;
              return regeneratorRuntime.async(function filterRequests$(_context86) {
                while (1) {
                  switch (_context86.prev = _context86.next) {
                    case 0:
                      filter = {};

                      if (capacity.length > 0) {
                        filter.capacityId = { $in: capacity };
                      }
                      if (category.length > 0) {
                        filter.categoryId = { $in: category };
                      }
                      if (city != "") {
                        filter.city = city;
                      }
                      if (state != "") {
                        filter.state = state;
                      }
                      skip = limit * pageNo;
                      _context86.next = 8;
                      return regeneratorRuntime.awrap(Requests.find(filter).sort({ "createdAt": -1 }).skip(skip).limit(limit).toArray());

                    case 8:
                      _context86.t0 = prepare;
                      return _context86.abrupt('return', _context86.sent.map(_context86.t0));

                    case 10:
                    case 'end':
                      return _context86.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'profileMessages', function profileMessages(root, _ref83) {
              var userId = _ref83.userId;
              var res, condi, k, userIds, response, requestIds, i, filter, obj;
              return regeneratorRuntime.async(function profileMessages$(_context87) {
                while (1) {
                  switch (_context87.prev = _context87.next) {
                    case 0:
                      res = [];
                      condi = { "$or": [{ "receiverId": userId }] };
                      _context87.next = 4;
                      return regeneratorRuntime.awrap(Messages.group(["senderId", "requestId"], condi, { "count": 0 }, "function (obj, prev) { prev.count++; }").then(function (results) {
                        res = results;
                      }));

                    case 4:
                      k = 0;
                      userIds = [];
                      response = [];
                      requestIds = [];
                      i = 0;

                    case 9:
                      if (!(i < res.length)) {
                        _context87.next = 21;
                        break;
                      }

                      filter = {};

                      filter.requestId = res[i].requestId;
                      filter.$or = [{ senderId: res[i].senderId }, { receiverId: res[i].senderId }];
                      _context87.next = 15;
                      return regeneratorRuntime.awrap(Messages.find(filter).sort({ "createdAt": 1 }).limit(1).toArray());

                    case 15:
                      _context87.t0 = prepare;
                      obj = _context87.sent.map(_context87.t0);

                      res[i] = obj[0];

                    case 18:
                      i++;
                      _context87.next = 9;
                      break;

                    case 21:
                      return _context87.abrupt('return', res);

                    case 22:
                    case 'end':
                      return _context87.stop();
                  }
                }
              }, null, undefined);
            }), _defineProperty(_Query, 'getFullMessageHistoryForUser', function getFullMessageHistoryForUser(root, _ref84) {
              var senderId = _ref84.senderId,
                  receiverId = _ref84.receiverId,
                  requestId = _ref84.requestId;
              var request, filter;
              return regeneratorRuntime.async(function getFullMessageHistoryForUser$(_context88) {
                while (1) {
                  switch (_context88.prev = _context88.next) {
                    case 0:
                      _context88.t0 = prepare;
                      _context88.next = 3;
                      return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(requestId)));

                    case 3:
                      _context88.t1 = _context88.sent;
                      request = (0, _context88.t0)(_context88.t1);

                      if (!request) {
                        _context88.next = 12;
                        break;
                      }

                      filter = { "requestId": requestId };

                      if (request.userId == senderId) {
                        filter.$or = [{ "senderId": receiverId }, { "receiverId": receiverId }];
                      } else {
                        filter.$or = [{ "senderId": senderId }, { "receiverId": senderId }];
                      }

                      _context88.next = 10;
                      return regeneratorRuntime.awrap(Messages.find(filter).sort({ "createdAt": 1 }).limit(100).toArray());

                    case 10:
                      _context88.t2 = prepare;
                      return _context88.abrupt('return', _context88.sent.map(_context88.t2));

                    case 12:
                      return _context88.abrupt('return', []);

                    case 13:
                    case 'end':
                      return _context88.stop();
                  }
                }
              }, null, undefined);
            }), _Query),

            Booking: {
              spacse: function spacse(_ref85) {
                var spaceId = _ref85.spaceId;
                return regeneratorRuntime.async(function spacse$(_context89) {
                  while (1) {
                    switch (_context89.prev = _context89.next) {
                      case 0:
                        _context89.t0 = prepare;
                        _context89.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spaceId)));

                      case 3:
                        _context89.t1 = _context89.sent;
                        return _context89.abrupt('return', (0, _context89.t0)(_context89.t1));

                      case 5:
                      case 'end':
                        return _context89.stop();
                    }
                  }
                }, null, undefined);
              },
              user: function user(_ref86) {
                var userId = _ref86.userId;
                return regeneratorRuntime.async(function user$(_context90) {
                  while (1) {
                    switch (_context90.prev = _context90.next) {
                      case 0:
                        _context90.t0 = prepare;
                        _context90.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context90.t1 = _context90.sent;
                        return _context90.abrupt('return', (0, _context90.t0)(_context90.t1));

                      case 5:
                      case 'end':
                        return _context90.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            Favourite: {
              spacse: function spacse(_ref87) {
                var spacseId = _ref87.spacseId;
                return regeneratorRuntime.async(function spacse$(_context91) {
                  while (1) {
                    switch (_context91.prev = _context91.next) {
                      case 0:
                        _context91.t0 = prepare;
                        _context91.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context91.t1 = _context91.sent;
                        return _context91.abrupt('return', (0, _context91.t0)(_context91.t1));

                      case 5:
                      case 'end':
                        return _context91.stop();
                    }
                  }
                }, null, undefined);
              },
              user: function user(_ref88) {
                var userId = _ref88.userId;
                return regeneratorRuntime.async(function user$(_context92) {
                  while (1) {
                    switch (_context92.prev = _context92.next) {
                      case 0:
                        _context92.t0 = prepare;
                        _context92.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context92.t1 = _context92.sent;
                        return _context92.abrupt('return', (0, _context92.t0)(_context92.t1));

                      case 5:
                      case 'end':
                        return _context92.stop();
                    }
                  }
                }, null, undefined);
              }

            },

            PaymentMethod: {
              user: function user(_ref89) {
                var userId = _ref89.userId;
                return regeneratorRuntime.async(function user$(_context93) {
                  while (1) {
                    switch (_context93.prev = _context93.next) {
                      case 0:
                        _context93.t0 = prepare;
                        _context93.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context93.t1 = _context93.sent;
                        return _context93.abrupt('return', (0, _context93.t0)(_context93.t1));

                      case 5:
                      case 'end':
                        return _context93.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            User: {
              requests: function requests(_ref90) {
                var _id = _ref90._id;
                return regeneratorRuntime.async(function requests$(_context94) {
                  while (1) {
                    switch (_context94.prev = _context94.next) {
                      case 0:
                        _context94.next = 2;
                        return regeneratorRuntime.awrap(Requests.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context94.t0 = prepare;
                        return _context94.abrupt('return', _context94.sent.map(_context94.t0));

                      case 4:
                      case 'end':
                        return _context94.stop();
                    }
                  }
                }, null, undefined);
              },
              comments: function comments(_ref91) {
                var _id = _ref91._id;
                return regeneratorRuntime.async(function comments$(_context95) {
                  while (1) {
                    switch (_context95.prev = _context95.next) {
                      case 0:
                        _context95.next = 2;
                        return regeneratorRuntime.awrap(Comments.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context95.t0 = prepare;
                        return _context95.abrupt('return', _context95.sent.map(_context95.t0));

                      case 4:
                      case 'end':
                        return _context95.stop();
                    }
                  }
                }, null, undefined);
              },
              socialMedias: function socialMedias(_ref92) {
                var _id = _ref92._id;
                return regeneratorRuntime.async(function socialMedias$(_context96) {
                  while (1) {
                    switch (_context96.prev = _context96.next) {
                      case 0:
                        _context96.next = 2;
                        return regeneratorRuntime.awrap(UserSocialMedias.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context96.t0 = prepare;
                        return _context96.abrupt('return', _context96.sent.map(_context96.t0));

                      case 4:
                      case 'end':
                        return _context96.stop();
                    }
                  }
                }, null, undefined);
              },
              loginSessions: function loginSessions(_ref93) {
                var _id = _ref93._id;
                return regeneratorRuntime.async(function loginSessions$(_context97) {
                  while (1) {
                    switch (_context97.prev = _context97.next) {
                      case 0:
                        _context97.next = 2;
                        return regeneratorRuntime.awrap(LoginSessions.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context97.t0 = prepare;
                        return _context97.abrupt('return', _context97.sent.map(_context97.t0));

                      case 4:
                      case 'end':
                        return _context97.stop();
                    }
                  }
                }, null, undefined);
              },
              userPaymentInfo: function userPaymentInfo(_ref94) {
                var _id = _ref94._id;
                return regeneratorRuntime.async(function userPaymentInfo$(_context98) {
                  while (1) {
                    switch (_context98.prev = _context98.next) {
                      case 0:
                        _context98.t0 = prepare;
                        _context98.next = 3;
                        return regeneratorRuntime.awrap(UserPaymentInfos.findOne({ userId: _id }));

                      case 3:
                        _context98.t1 = _context98.sent;
                        return _context98.abrupt('return', (0, _context98.t0)(_context98.t1));

                      case 5:
                      case 'end':
                        return _context98.stop();
                    }
                  }
                }, null, undefined);
              },
              requestFlags: function requestFlags(_ref95) {
                var _id = _ref95._id;
                return regeneratorRuntime.async(function requestFlags$(_context99) {
                  while (1) {
                    switch (_context99.prev = _context99.next) {
                      case 0:
                        _context99.next = 2;
                        return regeneratorRuntime.awrap(RequestFlags.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context99.t0 = prepare;
                        return _context99.abrupt('return', _context99.sent.map(_context99.t0));

                      case 4:
                      case 'end':
                        return _context99.stop();
                    }
                  }
                }, null, undefined);
              },
              requestTransactions: function requestTransactions(_ref96) {
                var _id = _ref96._id;
                return regeneratorRuntime.async(function requestTransactions$(_context100) {
                  while (1) {
                    switch (_context100.prev = _context100.next) {
                      case 0:
                        _context100.next = 2;
                        return regeneratorRuntime.awrap(RequestTransactions.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context100.t0 = prepare;
                        return _context100.abrupt('return', _context100.sent.map(_context100.t0));

                      case 4:
                      case 'end':
                        return _context100.stop();
                    }
                  }
                }, null, undefined);
              },
              spacses: function spacses(_ref97) {
                var _id = _ref97._id;
                return regeneratorRuntime.async(function spacses$(_context101) {
                  while (1) {
                    switch (_context101.prev = _context101.next) {
                      case 0:
                        _context101.next = 2;
                        return regeneratorRuntime.awrap(Spacses.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context101.t0 = prepare;
                        return _context101.abrupt('return', _context101.sent.map(_context101.t0));

                      case 4:
                      case 'end':
                        return _context101.stop();
                    }
                  }
                }, null, undefined);
              },
              messageHistories: function messageHistories(_ref98) {
                var _id = _ref98._id;
                return regeneratorRuntime.async(function messageHistories$(_context102) {
                  while (1) {
                    switch (_context102.prev = _context102.next) {
                      case 0:
                        _context102.next = 2;
                        return regeneratorRuntime.awrap(MessageHistories.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context102.t0 = prepare;
                        return _context102.abrupt('return', _context102.sent.map(_context102.t0));

                      case 4:
                      case 'end':
                        return _context102.stop();
                    }
                  }
                }, null, undefined);
              },
              contactToHosts: function contactToHosts(_ref99) {
                var _id = _ref99._id;
                return regeneratorRuntime.async(function contactToHosts$(_context103) {
                  while (1) {
                    switch (_context103.prev = _context103.next) {
                      case 0:
                        _context103.next = 2;
                        return regeneratorRuntime.awrap(ContactToHosts.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context103.t0 = prepare;
                        return _context103.abrupt('return', _context103.sent.map(_context103.t0));

                      case 4:
                      case 'end':
                        return _context103.stop();
                    }
                  }
                }, null, undefined);
              },
              spacseOffers: function spacseOffers(_ref100) {
                var _id = _ref100._id;
                return regeneratorRuntime.async(function spacseOffers$(_context104) {
                  while (1) {
                    switch (_context104.prev = _context104.next) {
                      case 0:
                        _context104.next = 2;
                        return regeneratorRuntime.awrap(SpacseOffers.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context104.t0 = prepare;
                        return _context104.abrupt('return', _context104.sent.map(_context104.t0));

                      case 4:
                      case 'end':
                        return _context104.stop();
                    }
                  }
                }, null, undefined);
              },
              spacseTours: function spacseTours(_ref101) {
                var _id = _ref101._id;
                return regeneratorRuntime.async(function spacseTours$(_context105) {
                  while (1) {
                    switch (_context105.prev = _context105.next) {
                      case 0:
                        _context105.next = 2;
                        return regeneratorRuntime.awrap(SpacseTours.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context105.t0 = prepare;
                        return _context105.abrupt('return', _context105.sent.map(_context105.t0));

                      case 4:
                      case 'end':
                        return _context105.stop();
                    }
                  }
                }, null, undefined);
              },
              orders: function orders(_ref102) {
                var _id = _ref102._id;
                return regeneratorRuntime.async(function orders$(_context106) {
                  while (1) {
                    switch (_context106.prev = _context106.next) {
                      case 0:
                        _context106.next = 2;
                        return regeneratorRuntime.awrap(SpacseOrderBooks.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context106.t0 = prepare;
                        return _context106.abrupt('return', _context106.sent.map(_context106.t0));

                      case 4:
                      case 'end':
                        return _context106.stop();
                    }
                  }
                }, null, undefined);
              },
              bookings: function bookings(_ref103) {
                var _id = _ref103._id;
                return regeneratorRuntime.async(function bookings$(_context107) {
                  while (1) {
                    switch (_context107.prev = _context107.next) {
                      case 0:
                        _context107.next = 2;
                        return regeneratorRuntime.awrap(Bookings.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context107.t0 = prepare;
                        return _context107.abrupt('return', _context107.sent.map(_context107.t0));

                      case 4:
                      case 'end':
                        return _context107.stop();
                    }
                  }
                }, null, undefined);
              },
              events: function events(_ref104) {
                var _id = _ref104._id;
                return regeneratorRuntime.async(function events$(_context108) {
                  while (1) {
                    switch (_context108.prev = _context108.next) {
                      case 0:
                        _context108.next = 2;
                        return regeneratorRuntime.awrap(Events.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context108.t0 = prepare;
                        return _context108.abrupt('return', _context108.sent.map(_context108.t0));

                      case 4:
                      case 'end':
                        return _context108.stop();
                    }
                  }
                }, null, undefined);
              },
              paymentmethods: function paymentmethods(_ref105) {
                var _id = _ref105._id;
                return regeneratorRuntime.async(function paymentmethods$(_context109) {
                  while (1) {
                    switch (_context109.prev = _context109.next) {
                      case 0:
                        _context109.next = 2;
                        return regeneratorRuntime.awrap(PaymentMethods.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context109.t0 = prepare;
                        return _context109.abrupt('return', _context109.sent.map(_context109.t0));

                      case 4:
                      case 'end':
                        return _context109.stop();
                    }
                  }
                }, null, undefined);
              },
              favourites: function favourites(_ref106) {
                var _id = _ref106._id;
                return regeneratorRuntime.async(function favourites$(_context110) {
                  while (1) {
                    switch (_context110.prev = _context110.next) {
                      case 0:
                        _context110.next = 2;
                        return regeneratorRuntime.awrap(Favourites.find({ userId: _id }).limit(50).toArray());

                      case 2:
                        _context110.t0 = prepare;
                        return _context110.abrupt('return', _context110.sent.map(_context110.t0));

                      case 4:
                      case 'end':
                        return _context110.stop();
                    }
                  }
                }, null, undefined);
              },

              accountsetting: function accountsetting(_ref107) {
                var _id = _ref107._id;
                var accId;
                return regeneratorRuntime.async(function accountsetting$(_context111) {
                  while (1) {
                    switch (_context111.prev = _context111.next) {
                      case 0:
                        _context111.next = 2;
                        return regeneratorRuntime.awrap(UserAccountSettings.findOne({ userId: _id }));

                      case 2:
                        accId = _context111.sent;

                        if (!accId) {
                          _context111.next = 11;
                          break;
                        }

                        _context111.t0 = prepare;
                        _context111.next = 7;
                        return regeneratorRuntime.awrap(UserAccountSettings.findOne({ userId: _id }));

                      case 7:
                        _context111.t1 = _context111.sent;
                        return _context111.abrupt('return', (0, _context111.t0)(_context111.t1));

                      case 11:
                        return _context111.abrupt('return', { _id: "", smsNotification: "false", generalNotification: "false", reservationNotification: "false", accountNotification: "false" });

                      case 12:
                      case 'end':
                        return _context111.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            UserSocialMedia: {
              user: function user(_ref108) {
                var userId = _ref108.userId;
                return regeneratorRuntime.async(function user$(_context112) {
                  while (1) {
                    switch (_context112.prev = _context112.next) {
                      case 0:
                        _context112.t0 = prepare;
                        _context112.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context112.t1 = _context112.sent;
                        return _context112.abrupt('return', (0, _context112.t0)(_context112.t1));

                      case 5:
                      case 'end':
                        return _context112.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            LoginSession: {
              user: function user(_ref109) {
                var userId = _ref109.userId;
                return regeneratorRuntime.async(function user$(_context113) {
                  while (1) {
                    switch (_context113.prev = _context113.next) {
                      case 0:
                        _context113.t0 = prepare;
                        _context113.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context113.t1 = _context113.sent;
                        return _context113.abrupt('return', (0, _context113.t0)(_context113.t1));

                      case 5:
                      case 'end':
                        return _context113.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            UserPaymentInfo: {
              user: function user(_ref110) {
                var userId = _ref110.userId;
                return regeneratorRuntime.async(function user$(_context114) {
                  while (1) {
                    switch (_context114.prev = _context114.next) {
                      case 0:
                        _context114.t0 = prepare;
                        _context114.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context114.t1 = _context114.sent;
                        return _context114.abrupt('return', (0, _context114.t0)(_context114.t1));

                      case 5:
                      case 'end':
                        return _context114.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Category: {
              requests: function requests(_ref111) {
                var _id = _ref111._id;
                return regeneratorRuntime.async(function requests$(_context115) {
                  while (1) {
                    switch (_context115.prev = _context115.next) {
                      case 0:
                        _context115.next = 2;
                        return regeneratorRuntime.awrap(Requests.find({ categoryId: _id }).limit(50).toArray());

                      case 2:
                        _context115.t0 = prepare;
                        return _context115.abrupt('return', _context115.sent.map(_context115.t0));

                      case 4:
                      case 'end':
                        return _context115.stop();
                    }
                  }
                }, null, undefined);
              },
              spacses: function spacses(_ref112) {
                var _id = _ref112._id;
                return regeneratorRuntime.async(function spacses$(_context116) {
                  while (1) {
                    switch (_context116.prev = _context116.next) {
                      case 0:
                        _context116.next = 2;
                        return regeneratorRuntime.awrap(Spacses.find({ categoryId: _id }).limit(50).toArray());

                      case 2:
                        _context116.t0 = prepare;
                        return _context116.abrupt('return', _context116.sent.map(_context116.t0));

                      case 4:
                      case 'end':
                        return _context116.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            UserAccountSetting: {
              user: function user(_ref113) {
                var userId = _ref113.userId;
                return regeneratorRuntime.async(function user$(_context117) {
                  while (1) {
                    switch (_context117.prev = _context117.next) {
                      case 0:
                        _context117.t0 = prepare;
                        _context117.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context117.t1 = _context117.sent;
                        return _context117.abrupt('return', (0, _context117.t0)(_context117.t1));

                      case 5:
                      case 'end':
                        return _context117.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Request: {
              user: function user(_ref114) {
                var userId = _ref114.userId;
                return regeneratorRuntime.async(function user$(_context118) {
                  while (1) {
                    switch (_context118.prev = _context118.next) {
                      case 0:
                        _context118.t0 = prepare;
                        _context118.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context118.t1 = _context118.sent;
                        return _context118.abrupt('return', (0, _context118.t0)(_context118.t1));

                      case 5:
                      case 'end':
                        return _context118.stop();
                    }
                  }
                }, null, undefined);
              },
              category: function category(_ref115) {
                var categoryId = _ref115.categoryId;
                var cat;
                return regeneratorRuntime.async(function category$(_context119) {
                  while (1) {
                    switch (_context119.prev = _context119.next) {
                      case 0:
                        _context119.next = 2;
                        return regeneratorRuntime.awrap(Categories.findOne((0, _mongodb.ObjectId)(categoryId)));

                      case 2:
                        cat = _context119.sent;

                        if (!cat) {
                          _context119.next = 11;
                          break;
                        }

                        _context119.t0 = prepare;
                        _context119.next = 7;
                        return regeneratorRuntime.awrap(Categories.findOne((0, _mongodb.ObjectId)(categoryId)));

                      case 7:
                        _context119.t1 = _context119.sent;
                        return _context119.abrupt('return', (0, _context119.t0)(_context119.t1));

                      case 11:
                        return _context119.abrupt('return', { _id: "", title: "" });

                      case 12:
                      case 'end':
                        return _context119.stop();
                    }
                  }
                }, null, undefined);
              },
              capacity: function capacity(_ref116) {
                var capacityId = _ref116.capacityId;
                var res;
                return regeneratorRuntime.async(function capacity$(_context120) {
                  while (1) {
                    switch (_context120.prev = _context120.next) {
                      case 0:
                        _context120.next = 2;
                        return regeneratorRuntime.awrap(ProperyCapacities.findOne((0, _mongodb.ObjectId)(capacityId)));

                      case 2:
                        res = _context120.sent;

                        if (!res) {
                          _context120.next = 7;
                          break;
                        }

                        return _context120.abrupt('return', prepare(res));

                      case 7:
                        return _context120.abrupt('return', {});

                      case 8:
                      case 'end':
                        return _context120.stop();
                    }
                  }
                }, null, undefined);
              },
              budget: function budget(_ref117) {
                var budgetId = _ref117.budgetId;
                return regeneratorRuntime.async(function budget$(_context121) {
                  while (1) {
                    switch (_context121.prev = _context121.next) {
                      case 0:
                        _context121.t0 = prepare;
                        _context121.next = 3;
                        return regeneratorRuntime.awrap(Budgets.findOne((0, _mongodb.ObjectId)(budgetId)));

                      case 3:
                        _context121.t1 = _context121.sent;
                        return _context121.abrupt('return', (0, _context121.t0)(_context121.t1));

                      case 5:
                      case 'end':
                        return _context121.stop();
                    }
                  }
                }, null, undefined);
              },
              comments: function comments(_ref118) {
                var _id = _ref118._id;
                return regeneratorRuntime.async(function comments$(_context122) {
                  while (1) {
                    switch (_context122.prev = _context122.next) {
                      case 0:
                        _context122.next = 2;
                        return regeneratorRuntime.awrap(Comments.find({ requestId: _id }).sort({ "createdAt": -1 }).limit(50).toArray());

                      case 2:
                        _context122.t0 = prepare;
                        return _context122.abrupt('return', _context122.sent.map(_context122.t0));

                      case 4:
                      case 'end':
                        return _context122.stop();
                    }
                  }
                }, null, undefined);
              },
              messages: function messages(_ref119, _ref120) {
                var _id = _ref119._id;
                var loginUserId = _ref120.loginUserId;
                var filter;
                return regeneratorRuntime.async(function messages$(_context123) {
                  while (1) {
                    switch (_context123.prev = _context123.next) {
                      case 0:
                        if (!loginUserId) {
                          _context123.next = 10;
                          break;
                        }

                        filter = {};

                        filter.requestId = _id;
                        filter.$or = [{ senderId: loginUserId }, { receiverId: loginUserId }];

                        _context123.next = 6;
                        return regeneratorRuntime.awrap(Messages.find(filter).sort({ "createdAt": 1 }).limit(50).toArray());

                      case 6:
                        _context123.t0 = prepare;
                        return _context123.abrupt('return', _context123.sent.map(_context123.t0));

                      case 10:
                        return _context123.abrupt('return', []);

                      case 11:
                      case 'end':
                        return _context123.stop();
                    }
                  }
                }, null, undefined);
              },
              flags: function flags(_ref121) {
                var _id = _ref121._id;
                return regeneratorRuntime.async(function flags$(_context124) {
                  while (1) {
                    switch (_context124.prev = _context124.next) {
                      case 0:
                        _context124.next = 2;
                        return regeneratorRuntime.awrap(RequestFlag.find({ requestId: _id }).limit(50).toArray());

                      case 2:
                        _context124.t0 = prepare;
                        return _context124.abrupt('return', _context124.sent.map(_context124.t0));

                      case 4:
                      case 'end':
                        return _context124.stop();
                    }
                  }
                }, null, undefined);
              },
              requestTransactions: function requestTransactions(_ref122) {
                var _id = _ref122._id;
                return regeneratorRuntime.async(function requestTransactions$(_context125) {
                  while (1) {
                    switch (_context125.prev = _context125.next) {
                      case 0:
                        _context125.next = 2;
                        return regeneratorRuntime.awrap(RequestTransaction.find({ requestId: _id }).limit(50).toArray());

                      case 2:
                        _context125.t0 = prepare;
                        return _context125.abrupt('return', _context125.sent.map(_context125.t0));

                      case 4:
                      case 'end':
                        return _context125.stop();
                    }
                  }
                }, null, undefined);
              },
              spaces: function spaces(_ref123, _ref124) {
                var _id = _ref123._id,
                    userId = _ref123.userId;
                var loginUserId = _ref124.loginUserId;
                return regeneratorRuntime.async(function spaces$(_context126) {
                  while (1) {
                    switch (_context126.prev = _context126.next) {
                      case 0:
                        if (!(userId == loginUserId)) {
                          _context126.next = 7;
                          break;
                        }

                        _context126.next = 3;
                        return regeneratorRuntime.awrap(RequestsSpacses.find({ requestId: _id }).toArray());

                      case 3:
                        _context126.t0 = prepare;
                        return _context126.abrupt('return', _context126.sent.map(_context126.t0));

                      case 7:
                        _context126.next = 9;
                        return regeneratorRuntime.awrap(RequestsSpacses.find({ requestId: _id, userId: loginUserId }).toArray());

                      case 9:
                        _context126.t1 = prepare;
                        return _context126.abrupt('return', _context126.sent.map(_context126.t1));

                      case 11:
                      case 'end':
                        return _context126.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            RequestsSpacse: {
              spacse: function spacse(_ref125) {
                var spacseId = _ref125.spacseId;
                return regeneratorRuntime.async(function spacse$(_context127) {
                  while (1) {
                    switch (_context127.prev = _context127.next) {
                      case 0:
                        _context127.t0 = prepare;
                        _context127.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context127.t1 = _context127.sent;
                        return _context127.abrupt('return', (0, _context127.t0)(_context127.t1));

                      case 5:
                      case 'end':
                        return _context127.stop();
                    }
                  }
                }, null, undefined);
              },
              user: function user(_ref126) {
                var userId = _ref126.userId;
                return regeneratorRuntime.async(function user$(_context128) {
                  while (1) {
                    switch (_context128.prev = _context128.next) {
                      case 0:
                        _context128.t0 = prepare;
                        _context128.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context128.t1 = _context128.sent;
                        return _context128.abrupt('return', (0, _context128.t0)(_context128.t1));

                      case 5:
                      case 'end':
                        return _context128.stop();
                    }
                  }
                }, null, undefined);
              },
              request: function request(_ref127) {
                var requestId = _ref127.requestId;
                return regeneratorRuntime.async(function request$(_context129) {
                  while (1) {
                    switch (_context129.prev = _context129.next) {
                      case 0:
                        _context129.t0 = prepare;
                        _context129.next = 3;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(requestId)));

                      case 3:
                        _context129.t1 = _context129.sent;
                        return _context129.abrupt('return', (0, _context129.t0)(_context129.t1));

                      case 5:
                      case 'end':
                        return _context129.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            RequestFlag: {
              user: function user(_ref128) {
                var userId = _ref128.userId;
                return regeneratorRuntime.async(function user$(_context130) {
                  while (1) {
                    switch (_context130.prev = _context130.next) {
                      case 0:
                        _context130.t0 = prepare;
                        _context130.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context130.t1 = _context130.sent;
                        return _context130.abrupt('return', (0, _context130.t0)(_context130.t1));

                      case 5:
                      case 'end':
                        return _context130.stop();
                    }
                  }
                }, null, undefined);
              },
              request: function request(_ref129) {
                var requestId = _ref129.requestId;
                return regeneratorRuntime.async(function request$(_context131) {
                  while (1) {
                    switch (_context131.prev = _context131.next) {
                      case 0:
                        _context131.t0 = prepare;
                        _context131.next = 3;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(requestId)));

                      case 3:
                        _context131.t1 = _context131.sent;
                        return _context131.abrupt('return', (0, _context131.t0)(_context131.t1));

                      case 5:
                      case 'end':
                        return _context131.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Comment: {
              user: function user(_ref130) {
                var userId = _ref130.userId;
                return regeneratorRuntime.async(function user$(_context132) {
                  while (1) {
                    switch (_context132.prev = _context132.next) {
                      case 0:
                        _context132.t0 = prepare;
                        _context132.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context132.t1 = _context132.sent;
                        return _context132.abrupt('return', (0, _context132.t0)(_context132.t1));

                      case 5:
                      case 'end':
                        return _context132.stop();
                    }
                  }
                }, null, undefined);
              },
              request: function request(_ref131) {
                var requestId = _ref131.requestId;
                return regeneratorRuntime.async(function request$(_context133) {
                  while (1) {
                    switch (_context133.prev = _context133.next) {
                      case 0:
                        _context133.t0 = prepare;
                        _context133.next = 3;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(requestId)));

                      case 3:
                        _context133.t1 = _context133.sent;
                        return _context133.abrupt('return', (0, _context133.t0)(_context133.t1));

                      case 5:
                      case 'end':
                        return _context133.stop();
                    }
                  }
                }, null, undefined);
              },
              spacse: function spacse(_ref132) {
                var requestId = _ref132.requestId;
                return regeneratorRuntime.async(function spacse$(_context134) {
                  while (1) {
                    switch (_context134.prev = _context134.next) {
                      case 0:
                        _context134.t0 = prepare;
                        _context134.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(requestId)));

                      case 3:
                        _context134.t1 = _context134.sent;
                        return _context134.abrupt('return', (0, _context134.t0)(_context134.t1));

                      case 5:
                      case 'end':
                        return _context134.stop();
                    }
                  }
                }, null, undefined);
              },
              replies: function replies(_ref133) {
                var _id = _ref133._id;
                return regeneratorRuntime.async(function replies$(_context135) {
                  while (1) {
                    switch (_context135.prev = _context135.next) {
                      case 0:
                        _context135.t0 = prepare;
                        _context135.next = 3;
                        return regeneratorRuntime.awrap(Comments.find({ repliedToCommentId: _id }));

                      case 3:
                        _context135.t1 = _context135.sent;
                        return _context135.abrupt('return', (0, _context135.t0)(_context135.t1));

                      case 5:
                      case 'end':
                        return _context135.stop();
                    }
                  }
                }, null, undefined);
              },
              requestTransaction: function requestTransaction(_ref134) {
                var transactionId = _ref134.transactionId;
                return regeneratorRuntime.async(function requestTransaction$(_context136) {
                  while (1) {
                    switch (_context136.prev = _context136.next) {
                      case 0:
                        _context136.t0 = prepare;
                        _context136.next = 3;
                        return regeneratorRuntime.awrap(RequestTransactions.findOne((0, _mongodb.ObjectId)(transactionId)));

                      case 3:
                        _context136.t1 = _context136.sent;
                        return _context136.abrupt('return', (0, _context136.t0)(_context136.t1));

                      case 5:
                      case 'end':
                        return _context136.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            RequestTransaction: {
              user: function user(_ref135) {
                var userId = _ref135.userId;
                return regeneratorRuntime.async(function user$(_context137) {
                  while (1) {
                    switch (_context137.prev = _context137.next) {
                      case 0:
                        _context137.t0 = prepare;
                        _context137.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context137.t1 = _context137.sent;
                        return _context137.abrupt('return', (0, _context137.t0)(_context137.t1));

                      case 5:
                      case 'end':
                        return _context137.stop();
                    }
                  }
                }, null, undefined);
              },
              request: function request(_ref136) {
                var requestId = _ref136.requestId;
                return regeneratorRuntime.async(function request$(_context138) {
                  while (1) {
                    switch (_context138.prev = _context138.next) {
                      case 0:
                        _context138.t0 = prepare;
                        _context138.next = 3;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(requestId)));

                      case 3:
                        _context138.t1 = _context138.sent;
                        return _context138.abrupt('return', (0, _context138.t0)(_context138.t1));

                      case 5:
                      case 'end':
                        return _context138.stop();
                    }
                  }
                }, null, undefined);
              },
              message: function message(_ref137) {
                var requestMessageId = _ref137.requestMessageId;
                return regeneratorRuntime.async(function message$(_context139) {
                  while (1) {
                    switch (_context139.prev = _context139.next) {
                      case 0:
                        _context139.t0 = prepare;
                        _context139.next = 3;
                        return regeneratorRuntime.awrap(Messages.findOne((0, _mongodb.ObjectId)(requestMessageId)));

                      case 3:
                        _context139.t1 = _context139.sent;
                        return _context139.abrupt('return', (0, _context139.t0)(_context139.t1));

                      case 5:
                      case 'end':
                        return _context139.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Message: {
              sender: function sender(_ref138) {
                var senderId = _ref138.senderId;
                return regeneratorRuntime.async(function sender$(_context140) {
                  while (1) {
                    switch (_context140.prev = _context140.next) {
                      case 0:
                        _context140.t0 = prepare;
                        _context140.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(senderId)));

                      case 3:
                        _context140.t1 = _context140.sent;
                        return _context140.abrupt('return', (0, _context140.t0)(_context140.t1));

                      case 5:
                      case 'end':
                        return _context140.stop();
                    }
                  }
                }, null, undefined);
              },
              receiver: function receiver(_ref139) {
                var receiverId = _ref139.receiverId;
                return regeneratorRuntime.async(function receiver$(_context141) {
                  while (1) {
                    switch (_context141.prev = _context141.next) {
                      case 0:
                        _context141.t0 = prepare;
                        _context141.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(receiverId)));

                      case 3:
                        _context141.t1 = _context141.sent;
                        return _context141.abrupt('return', (0, _context141.t0)(_context141.t1));

                      case 5:
                      case 'end':
                        return _context141.stop();
                    }
                  }
                }, null, undefined);
              },
              request: function request(_ref140) {
                var requestId = _ref140.requestId;
                return regeneratorRuntime.async(function request$(_context142) {
                  while (1) {
                    switch (_context142.prev = _context142.next) {
                      case 0:
                        _context142.t0 = prepare;
                        _context142.next = 3;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(requestId)));

                      case 3:
                        _context142.t1 = _context142.sent;
                        return _context142.abrupt('return', (0, _context142.t0)(_context142.t1));

                      case 5:
                      case 'end':
                        return _context142.stop();
                    }
                  }
                }, null, undefined);
              },
              spacse: function spacse(_ref141) {
                var spacseId = _ref141.spacseId;
                return regeneratorRuntime.async(function spacse$(_context143) {
                  while (1) {
                    switch (_context143.prev = _context143.next) {
                      case 0:
                        _context143.t0 = prepare;
                        _context143.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context143.t1 = _context143.sent;
                        return _context143.abrupt('return', (0, _context143.t0)(_context143.t1));

                      case 5:
                      case 'end':
                        return _context143.stop();
                    }
                  }
                }, null, undefined);
              },
              tour: function tour(_ref142) {
                var tourId = _ref142.tourId;
                return regeneratorRuntime.async(function tour$(_context144) {
                  while (1) {
                    switch (_context144.prev = _context144.next) {
                      case 0:
                        if (!tourId) {
                          _context144.next = 7;
                          break;
                        }

                        _context144.next = 3;
                        return regeneratorRuntime.awrap(SpacseTours.find((0, _mongodb.ObjectId)(tourId)).limit(1).toArray());

                      case 3:
                        _context144.t0 = prepare;
                        return _context144.abrupt('return', _context144.sent.map(_context144.t0));

                      case 7:
                        return _context144.abrupt('return', []);

                      case 8:
                      case 'end':
                        return _context144.stop();
                    }
                  }
                }, null, undefined);
              },
              requestTransaction: function requestTransaction(_ref143) {
                var transactionId = _ref143.transactionId;
                return regeneratorRuntime.async(function requestTransaction$(_context145) {
                  while (1) {
                    switch (_context145.prev = _context145.next) {
                      case 0:
                        _context145.next = 2;
                        return regeneratorRuntime.awrap(RequestTransactions.find((0, _mongodb.ObjectId)(transactionId)).limit(1).toArray());

                      case 2:
                        _context145.t0 = prepare;
                        return _context145.abrupt('return', _context145.sent.map(_context145.t0));

                      case 4:
                      case 'end':
                        return _context145.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Spacse: {
              user: function user(_ref144) {
                var userId = _ref144.userId;
                return regeneratorRuntime.async(function user$(_context146) {
                  while (1) {
                    switch (_context146.prev = _context146.next) {
                      case 0:
                        _context146.t0 = prepare;
                        _context146.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context146.t1 = _context146.sent;
                        return _context146.abrupt('return', (0, _context146.t0)(_context146.t1));

                      case 5:
                      case 'end':
                        return _context146.stop();
                    }
                  }
                }, null, undefined);
              },
              userPaymentInfo: function userPaymentInfo(_ref145) {
                var _id = _ref145._id;
                var res;
                return regeneratorRuntime.async(function userPaymentInfo$(_context147) {
                  while (1) {
                    switch (_context147.prev = _context147.next) {
                      case 0:
                        _context147.next = 2;
                        return regeneratorRuntime.awrap(UserPaymentInfos.findOne({ spacseId: _id }));

                      case 2:
                        res = _context147.sent;

                        if (!res) {
                          _context147.next = 7;
                          break;
                        }

                        return _context147.abrupt('return', prepare(res));

                      case 7:
                        return _context147.abrupt('return', {});

                      case 8:
                      case 'end':
                        return _context147.stop();
                    }
                  }
                }, null, undefined);
              },
              spaceCategories: function spaceCategories(_ref146) {
                var _id = _ref146._id;
                return regeneratorRuntime.async(function spaceCategories$(_context148) {
                  while (1) {
                    switch (_context148.prev = _context148.next) {
                      case 0:
                        _context148.next = 2;
                        return regeneratorRuntime.awrap(SpaceCategories.find({ spacseId: _id }).toArray());

                      case 2:
                        _context148.t0 = prepare;
                        return _context148.abrupt('return', _context148.sent.map(_context148.t0));

                      case 4:
                      case 'end':
                        return _context148.stop();
                    }
                  }
                }, null, undefined);
              },
              comments: function comments(_ref147, _ref148) {
                var _id = _ref147._id;
                var limit = _ref148.limit,
                    offset = _ref148.offset;
                return regeneratorRuntime.async(function comments$(_context149) {
                  while (1) {
                    switch (_context149.prev = _context149.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context149.next = 4;
                        return regeneratorRuntime.awrap(Comments.find({ requestId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context149.t0 = prepare;
                        return _context149.abrupt('return', _context149.sent.map(_context149.t0));

                      case 6:
                      case 'end':
                        return _context149.stop();
                    }
                  }
                }, null, undefined);
              },
              flags: function flags(_ref149, _ref150) {
                var _id = _ref149._id;
                var limit = _ref150.limit,
                    offset = _ref150.offset;
                return regeneratorRuntime.async(function flags$(_context150) {
                  while (1) {
                    switch (_context150.prev = _context150.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context150.next = 4;
                        return regeneratorRuntime.awrap(RequestFlags.find({ requestId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context150.t0 = prepare;
                        return _context150.abrupt('return', _context150.sent.map(_context150.t0));

                      case 6:
                      case 'end':
                        return _context150.stop();
                    }
                  }
                }, null, undefined);
              },
              spacseamenities: function spacseamenities(_ref151, _ref152) {
                var _id = _ref151._id;
                var limit = _ref152.limit,
                    offset = _ref152.offset;
                return regeneratorRuntime.async(function spacseamenities$(_context151) {
                  while (1) {
                    switch (_context151.prev = _context151.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context151.next = 4;
                        return regeneratorRuntime.awrap(SpacseAmenities.find({ spacseId: _id }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context151.t0 = prepare;
                        return _context151.abrupt('return', _context151.sent.map(_context151.t0));

                      case 6:
                      case 'end':
                        return _context151.stop();
                    }
                  }
                }, null, undefined);
              },
              avaibilities: function avaibilities(_ref153, _ref154) {
                var _id = _ref153._id;
                var limit = _ref154.limit,
                    offset = _ref154.offset;
                return regeneratorRuntime.async(function avaibilities$(_context152) {
                  while (1) {
                    switch (_context152.prev = _context152.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context152.next = 4;
                        return regeneratorRuntime.awrap(SpacseAvaibilities.find({ spacseId: _id }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context152.t0 = prepare;
                        return _context152.abrupt('return', _context152.sent.map(_context152.t0));

                      case 6:
                      case 'end':
                        return _context152.stop();
                    }
                  }
                }, null, undefined);
              },
              spacsePhotoGallery: function spacsePhotoGallery(_ref155, _ref156) {
                var _id = _ref155._id;
                var limit = _ref156.limit,
                    offset = _ref156.offset;
                return regeneratorRuntime.async(function spacsePhotoGallery$(_context153) {
                  while (1) {
                    switch (_context153.prev = _context153.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context153.next = 4;
                        return regeneratorRuntime.awrap(SpacsePhotoGalleries.find({ propertyId: _id }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context153.t0 = prepare;
                        return _context153.abrupt('return', _context153.sent.map(_context153.t0));

                      case 6:
                      case 'end':
                        return _context153.stop();
                    }
                  }
                }, null, undefined);
              },
              pricingLayer: function pricingLayer(_ref157, _ref158) {
                var _id = _ref157._id;
                var limit = _ref158.limit,
                    offset = _ref158.offset;
                return regeneratorRuntime.async(function pricingLayer$(_context154) {
                  while (1) {
                    switch (_context154.prev = _context154.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context154.next = 4;
                        return regeneratorRuntime.awrap(PricingLayers.find({ spacseId: _id }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context154.t0 = prepare;
                        return _context154.abrupt('return', _context154.sent.map(_context154.t0));

                      case 6:
                      case 'end':
                        return _context154.stop();
                    }
                  }
                }, null, undefined);
              },
              messageHistories: function messageHistories(_ref159, _ref160) {
                var _id = _ref159._id;
                var limit = _ref160.limit,
                    offset = _ref160.offset;
                return regeneratorRuntime.async(function messageHistories$(_context155) {
                  while (1) {
                    switch (_context155.prev = _context155.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context155.next = 4;
                        return regeneratorRuntime.awrap(MessageHistories.find({ spacseId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context155.t0 = prepare;
                        return _context155.abrupt('return', _context155.sent.map(_context155.t0));

                      case 6:
                      case 'end':
                        return _context155.stop();
                    }
                  }
                }, null, undefined);
              },
              spacseOffers: function spacseOffers(_ref161, _ref162) {
                var _id = _ref161._id;
                var limit = _ref162.limit,
                    offset = _ref162.offset;
                return regeneratorRuntime.async(function spacseOffers$(_context156) {
                  while (1) {
                    switch (_context156.prev = _context156.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context156.next = 4;
                        return regeneratorRuntime.awrap(SpacseOffers.find({ spacseId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context156.t0 = prepare;
                        return _context156.abrupt('return', _context156.sent.map(_context156.t0));

                      case 6:
                      case 'end':
                        return _context156.stop();
                    }
                  }
                }, null, undefined);
              },
              spacseTours: function spacseTours(_ref163, _ref164) {
                var _id = _ref163._id;
                var limit = _ref164.limit,
                    offset = _ref164.offset;
                return regeneratorRuntime.async(function spacseTours$(_context157) {
                  while (1) {
                    switch (_context157.prev = _context157.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context157.next = 4;
                        return regeneratorRuntime.awrap(SpacseTours.find({ spacseId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context157.t0 = prepare;
                        return _context157.abrupt('return', _context157.sent.map(_context157.t0));

                      case 6:
                      case 'end':
                        return _context157.stop();
                    }
                  }
                }, null, undefined);
              },
              orders: function orders(_ref165, _ref166) {
                var _id = _ref165._id;
                var limit = _ref166.limit,
                    offset = _ref166.offset;
                return regeneratorRuntime.async(function orders$(_context158) {
                  while (1) {
                    switch (_context158.prev = _context158.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context158.next = 4;
                        return regeneratorRuntime.awrap(SpacseOrderBooks.find({ requestId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context158.t0 = prepare;
                        return _context158.abrupt('return', _context158.sent.map(_context158.t0));

                      case 6:
                      case 'end':
                        return _context158.stop();
                    }
                  }
                }, null, undefined);
              },
              bookings: function bookings(_ref167, _ref168) {
                var _id = _ref167._id;
                var limit = _ref168.limit,
                    offset = _ref168.offset;
                return regeneratorRuntime.async(function bookings$(_context159) {
                  while (1) {
                    switch (_context159.prev = _context159.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context159.next = 4;
                        return regeneratorRuntime.awrap(Bookings.find({ requestId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context159.t0 = prepare;
                        return _context159.abrupt('return', _context159.sent.map(_context159.t0));

                      case 6:
                      case 'end':
                        return _context159.stop();
                    }
                  }
                }, null, undefined);
              },

              favourites: function favourites(_ref169, _ref170) {
                var _id = _ref169._id;
                var limit = _ref170.limit,
                    offset = _ref170.offset;
                return regeneratorRuntime.async(function favourites$(_context160) {
                  while (1) {
                    switch (_context160.prev = _context160.next) {
                      case 0:
                        if (!limit) {
                          limit = 20;
                        }
                        if (!offset) {
                          offset = 0;
                        }
                        _context160.next = 4;
                        return regeneratorRuntime.awrap(Favourites.find({ spacseId: _id }).sort({ "createdAt": -1 }).limit(limit).skip(offset).toArray());

                      case 4:
                        _context160.t0 = prepare;
                        return _context160.abrupt('return', _context160.sent.map(_context160.t0));

                      case 6:
                      case 'end':
                        return _context160.stop();
                    }
                  }
                }, null, undefined);
              },
              category: function category(_ref171) {
                var categoryId = _ref171.categoryId;
                var res;
                return regeneratorRuntime.async(function category$(_context161) {
                  while (1) {
                    switch (_context161.prev = _context161.next) {
                      case 0:
                        _context161.next = 2;
                        return regeneratorRuntime.awrap(Categories.findOne((0, _mongodb.ObjectId)(categoryId)));

                      case 2:
                        res = _context161.sent;

                        if (!res) {
                          _context161.next = 7;
                          break;
                        }

                        return _context161.abrupt('return', prepare(res));

                      case 7:
                        return _context161.abrupt('return', {});

                      case 8:
                      case 'end':
                        return _context161.stop();
                    }
                  }
                }, null, undefined);
              },
              capacity: function capacity(_ref172) {
                var capacityId = _ref172.capacityId;
                var res;
                return regeneratorRuntime.async(function capacity$(_context162) {
                  while (1) {
                    switch (_context162.prev = _context162.next) {
                      case 0:
                        _context162.next = 2;
                        return regeneratorRuntime.awrap(ProperyCapacities.findOne((0, _mongodb.ObjectId)(capacityId)));

                      case 2:
                        res = _context162.sent;

                        if (!res) {
                          _context162.next = 7;
                          break;
                        }

                        return _context162.abrupt('return', prepare(res));

                      case 7:
                        return _context162.abrupt('return', {});

                      case 8:
                      case 'end':
                        return _context162.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Amenities: {
              spacse: function spacse(_ref173) {
                var _id = _ref173._id;
                return regeneratorRuntime.async(function spacse$(_context163) {
                  while (1) {
                    switch (_context163.prev = _context163.next) {
                      case 0:
                        _context163.next = 2;
                        return regeneratorRuntime.awrap(SpacseAmenities.find({ amenitiesId: _id }).limit(50).toArray());

                      case 2:
                        _context163.t0 = prepare;
                        return _context163.abrupt('return', _context163.sent.map(_context163.t0));

                      case 4:
                      case 'end':
                        return _context163.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            SpacseAmenities: {
              spacse: function spacse(_ref174) {
                var spacseId = _ref174.spacseId;
                return regeneratorRuntime.async(function spacse$(_context164) {
                  while (1) {
                    switch (_context164.prev = _context164.next) {
                      case 0:
                        _context164.t0 = prepare;
                        _context164.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context164.t1 = _context164.sent;
                        return _context164.abrupt('return', (0, _context164.t0)(_context164.t1));

                      case 5:
                      case 'end':
                        return _context164.stop();
                    }
                  }
                }, null, undefined);
              },
              amenities: function amenities(_ref175) {
                var amenitiesId = _ref175.amenitiesId;
                return regeneratorRuntime.async(function amenities$(_context165) {
                  while (1) {
                    switch (_context165.prev = _context165.next) {
                      case 0:
                        _context165.t0 = prepare;
                        _context165.next = 3;
                        return regeneratorRuntime.awrap(Amenities.findOne((0, _mongodb.ObjectId)(amenitiesId)));

                      case 3:
                        _context165.t1 = _context165.sent;
                        return _context165.abrupt('return', (0, _context165.t0)(_context165.t1));

                      case 5:
                      case 'end':
                        return _context165.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            SpacseAvaibilities: {
              spacse: function spacse(_ref176) {
                var spacseId = _ref176.spacseId;
                return regeneratorRuntime.async(function spacse$(_context166) {
                  while (1) {
                    switch (_context166.prev = _context166.next) {
                      case 0:
                        _context166.t0 = prepare;
                        _context166.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context166.t1 = _context166.sent;
                        return _context166.abrupt('return', (0, _context166.t0)(_context166.t1));

                      case 5:
                      case 'end':
                        return _context166.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            SpacsePhotoGallery: {
              spacse: function spacse(_ref177) {
                var spacseId = _ref177.spacseId;
                return regeneratorRuntime.async(function spacse$(_context167) {
                  while (1) {
                    switch (_context167.prev = _context167.next) {
                      case 0:
                        _context167.t0 = prepare;
                        _context167.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context167.t1 = _context167.sent;
                        return _context167.abrupt('return', (0, _context167.t0)(_context167.t1));

                      case 5:
                      case 'end':
                        return _context167.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            PricingLayer: {
              spacse: function spacse(_ref178) {
                var spacseId = _ref178.spacseId;
                return regeneratorRuntime.async(function spacse$(_context168) {
                  while (1) {
                    switch (_context168.prev = _context168.next) {
                      case 0:
                        _context168.t0 = prepare;
                        _context168.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context168.t1 = _context168.sent;
                        return _context168.abrupt('return', (0, _context168.t0)(_context168.t1));

                      case 5:
                      case 'end':
                        return _context168.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            MessageHistory: {
              spacse: function spacse(_ref179) {
                var spacseId = _ref179.spacseId;
                return regeneratorRuntime.async(function spacse$(_context169) {
                  while (1) {
                    switch (_context169.prev = _context169.next) {
                      case 0:
                        _context169.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)).toArray());

                      case 2:
                        _context169.t0 = prepare;
                        return _context169.abrupt('return', _context169.sent.map(_context169.t0));

                      case 4:
                      case 'end':
                        return _context169.stop();
                    }
                  }
                }, null, undefined);
              },
              sender: function sender(_ref180) {
                var senderId = _ref180.senderId;
                return regeneratorRuntime.async(function sender$(_context170) {
                  while (1) {
                    switch (_context170.prev = _context170.next) {
                      case 0:
                        _context170.t0 = prepare;
                        _context170.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(senderId)));

                      case 3:
                        _context170.t1 = _context170.sent;
                        return _context170.abrupt('return', (0, _context170.t0)(_context170.t1));

                      case 5:
                      case 'end':
                        return _context170.stop();
                    }
                  }
                }, null, undefined);
              },
              reciever: function reciever(_ref181) {
                var receiverId = _ref181.receiverId;
                return regeneratorRuntime.async(function reciever$(_context171) {
                  while (1) {
                    switch (_context171.prev = _context171.next) {
                      case 0:
                        _context171.t0 = prepare;
                        _context171.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(receiverId)));

                      case 3:
                        _context171.t1 = _context171.sent;
                        return _context171.abrupt('return', (0, _context171.t0)(_context171.t1));

                      case 5:
                      case 'end':
                        return _context171.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            ContactToHost: {
              spacse: function spacse(_ref182) {
                var spacseId = _ref182.spacseId;
                return regeneratorRuntime.async(function spacse$(_context172) {
                  while (1) {
                    switch (_context172.prev = _context172.next) {
                      case 0:
                        _context172.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)).toArray());

                      case 2:
                        _context172.t0 = prepare;
                        return _context172.abrupt('return', _context172.sent.map(_context172.t0));

                      case 4:
                      case 'end':
                        return _context172.stop();
                    }
                  }
                }, null, undefined);
              },
              user: function user(_ref183) {
                var userId = _ref183.userId;
                return regeneratorRuntime.async(function user$(_context173) {
                  while (1) {
                    switch (_context173.prev = _context173.next) {
                      case 0:
                        _context173.t0 = prepare;
                        _context173.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context173.t1 = _context173.sent;
                        return _context173.abrupt('return', (0, _context173.t0)(_context173.t1));

                      case 5:
                      case 'end':
                        return _context173.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            SpacseOffer: {
              spacse: function spacse(_ref184) {
                var spacseId = _ref184.spacseId;
                return regeneratorRuntime.async(function spacse$(_context174) {
                  while (1) {
                    switch (_context174.prev = _context174.next) {
                      case 0:
                        _context174.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)).toArray());

                      case 2:
                        _context174.t0 = prepare;
                        return _context174.abrupt('return', _context174.sent.map(_context174.t0));

                      case 4:
                      case 'end':
                        return _context174.stop();
                    }
                  }
                }, null, undefined);
              },
              user: function user(_ref185) {
                var userId = _ref185.userId;
                return regeneratorRuntime.async(function user$(_context175) {
                  while (1) {
                    switch (_context175.prev = _context175.next) {
                      case 0:
                        _context175.t0 = prepare;
                        _context175.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context175.t1 = _context175.sent;
                        return _context175.abrupt('return', (0, _context175.t0)(_context175.t1));

                      case 5:
                      case 'end':
                        return _context175.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            SpacseTour: {
              spacse: function spacse(_ref186) {
                var spacseId = _ref186.spacseId;
                return regeneratorRuntime.async(function spacse$(_context176) {
                  while (1) {
                    switch (_context176.prev = _context176.next) {
                      case 0:
                        _context176.t0 = prepare;
                        _context176.next = 3;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 3:
                        _context176.t1 = _context176.sent;
                        return _context176.abrupt('return', (0, _context176.t0)(_context176.t1));

                      case 5:
                      case 'end':
                        return _context176.stop();
                    }
                  }
                }, null, undefined);
              },
              user: function user(_ref187) {
                var userId = _ref187.userId;
                return regeneratorRuntime.async(function user$(_context177) {
                  while (1) {
                    switch (_context177.prev = _context177.next) {
                      case 0:
                        _context177.t0 = prepare;
                        _context177.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context177.t1 = _context177.sent;
                        return _context177.abrupt('return', (0, _context177.t0)(_context177.t1));

                      case 5:
                      case 'end':
                        return _context177.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            SpacseOrderBook: {
              spacse: function spacse(_ref188) {
                var spacseId = _ref188.spacseId;
                return regeneratorRuntime.async(function spacse$(_context178) {
                  while (1) {
                    switch (_context178.prev = _context178.next) {
                      case 0:
                        _context178.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)).toArray());

                      case 2:
                        _context178.t0 = prepare;
                        return _context178.abrupt('return', _context178.sent.map(_context178.t0));

                      case 4:
                      case 'end':
                        return _context178.stop();
                    }
                  }
                }, null, undefined);
              },
              user: function user(_ref189) {
                var userId = _ref189.userId;
                return regeneratorRuntime.async(function user$(_context179) {
                  while (1) {
                    switch (_context179.prev = _context179.next) {
                      case 0:
                        _context179.t0 = prepare;
                        _context179.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context179.t1 = _context179.sent;
                        return _context179.abrupt('return', (0, _context179.t0)(_context179.t1));

                      case 5:
                      case 'end':
                        return _context179.stop();
                    }
                  }
                }, null, undefined);
              },
              pricingLayer: function pricingLayer(_ref190) {
                var pricingLayerId = _ref190.pricingLayerId;
                return regeneratorRuntime.async(function pricingLayer$(_context180) {
                  while (1) {
                    switch (_context180.prev = _context180.next) {
                      case 0:
                        _context180.t0 = prepare;
                        _context180.next = 3;
                        return regeneratorRuntime.awrap(PricingLayers.findOne((0, _mongodb.ObjectId)(pricingLayerId)));

                      case 3:
                        _context180.t1 = _context180.sent;
                        return _context180.abrupt('return', (0, _context180.t0)(_context180.t1));

                      case 5:
                      case 'end':
                        return _context180.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            Event: {
              user: function user(_ref191) {
                var userId = _ref191.userId;
                return regeneratorRuntime.async(function user$(_context181) {
                  while (1) {
                    switch (_context181.prev = _context181.next) {
                      case 0:
                        _context181.t0 = prepare;
                        _context181.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context181.t1 = _context181.sent;
                        return _context181.abrupt('return', (0, _context181.t0)(_context181.t1));

                      case 5:
                      case 'end':
                        return _context181.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            Mutation: {

              submitSpacesForRequest: function submitSpacesForRequest(root, args, context, info) {
                var request, i, data, res, currentTime, msg;
                return regeneratorRuntime.async(function submitSpacesForRequest$(_context182) {
                  while (1) {
                    switch (_context182.prev = _context182.next) {
                      case 0:
                        _context182.t0 = prepare;
                        _context182.next = 3;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(args.requestId)));

                      case 3:
                        _context182.t1 = _context182.sent;
                        request = (0, _context182.t0)(_context182.t1);

                        if (!request) {
                          _context182.next = 24;
                          break;
                        }

                        i = 0;

                      case 7:
                        if (!(i < args.spacsesId.length)) {
                          _context182.next = 21;
                          break;
                        }

                        data = {
                          "requestId": args.requestId,
                          "userId": args.userId,
                          "description": args.description,
                          "spaceLink": args.spaceLink,
                          "spacseId": args.spacsesId[i]
                        };
                        _context182.next = 11;
                        return regeneratorRuntime.awrap(RequestsSpacses.insert(data));

                      case 11:
                        res = _context182.sent;
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        data = {
                          senderId: args.userId,
                          receiverId: request.userId,
                          requestId: args.requestId,
                          spacseId: args.spacsesId[i],
                          comment: args.description,
                          messageType: "initialized",
                          createdAt: args.createdAt
                        };
                        _context182.next = 17;
                        return regeneratorRuntime.awrap(Messages.insert(data));

                      case 17:
                        msg = _context182.sent;

                      case 18:
                        i++;
                        _context182.next = 7;
                        break;

                      case 21:
                        return _context182.abrupt('return', { "message": "SpacseForRequest is submitted ", "code": "200" });

                      case 24:
                        return _context182.abrupt('return', { "message": "Invalid request id ", "code": "400" });

                      case 25:
                      case 'end':
                        return _context182.stop();
                    }
                  }
                }, null, undefined);
              },
              updateUser: function updateUser(root, args, context, info) {
                var user;
                return regeneratorRuntime.async(function updateUser$(_context183) {
                  while (1) {
                    switch (_context183.prev = _context183.next) {
                      case 0:
                        _context183.next = 2;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(args._id)));

                      case 2:
                        user = _context183.sent;

                        if (!user) {
                          _context183.next = 10;
                          break;
                        }

                        Object.keys(args).forEach(function (key) {
                          if (key == "_id") {
                            user[key] = (0, _mongodb.ObjectId)(args[key]);
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

                        _context183.next = 7;
                        return regeneratorRuntime.awrap(Users.update({ _id: (0, _mongodb.ObjectId)(user._id) }, user));

                      case 7:
                        return _context183.abrupt('return', { "message": "User profile updated ", "code": "200" });

                      case 10:
                        return _context183.abrupt('return', { "message": "No Rights", "code": "400" });

                      case 11:
                      case 'end':
                        return _context183.stop();
                    }
                  }
                }, null, undefined);
              },
              createUser: function createUser(root, args, context, info) {
                var res, _res, user, userId;

                return regeneratorRuntime.async(function createUser$(_context184) {
                  while (1) {
                    switch (_context184.prev = _context184.next) {
                      case 0:
                        _context184.next = 2;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email }));

                      case 2:
                        res = _context184.sent;

                        if (!res) {
                          _context184.next = 7;
                          break;
                        }

                        return _context184.abrupt('return', { "message": "Email already exist", "code": "400" });

                      case 7:
                        _context184.next = 9;
                        return regeneratorRuntime.awrap(Users.insert(args));

                      case 9:
                        _res = _context184.sent;
                        _context184.t0 = prepare;
                        _context184.next = 13;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: _res.insertedIds[1] }));

                      case 13:
                        _context184.t1 = _context184.sent;
                        user = (0, _context184.t0)(_context184.t1);
                        userId = _res.insertedIds[1].toString();
                        return _context184.abrupt('return', { "message": "Registration done successfully", "code": "200" });

                      case 17:
                      case 'end':
                        return _context184.stop();
                    }
                  }
                }, null, undefined);
              },

              loginWithFacebook: function loginWithFacebook(root, args, context, info) {
                var socialMedia, _LSdata, _res2, user, data, _LSdata2, res, LSdata;

                return regeneratorRuntime.async(function loginWithFacebook$(_context185) {
                  while (1) {
                    switch (_context185.prev = _context185.next) {
                      case 0:
                        _context185.next = 2;
                        return regeneratorRuntime.awrap(UserSocialMedias.findOne({ socialMediaName: "Facebook", socialMediaId: args.fbid }));

                      case 2:
                        socialMedia = _context185.sent;

                        if (!socialMedia) {
                          _context185.next = 9;
                          break;
                        }

                        _LSdata = { 'userId': socialMedia.userId, session: new Date().toISOString() + "-" + socialMedia.userId };
                        _context185.next = 7;
                        return regeneratorRuntime.awrap(LoginSessions.insert(_LSdata));

                      case 7:
                        _res2 = _context185.sent;
                        return _context185.abrupt('return', _res2.ops[0]);

                      case 9:
                        _context185.next = 11;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email }));

                      case 11:
                        user = _context185.sent;

                        if (!user) {
                          _context185.next = 26;
                          break;
                        }

                        user = prepare(user);
                        data = {};

                        data.userId = user._id;
                        data.socialMediaName = "Facebook";
                        data.socialMediaId = args.fbid;
                        _context185.next = 20;
                        return regeneratorRuntime.awrap(UserSocialMedias.insert(data));

                      case 20:
                        socialMedia = _context185.sent;
                        _LSdata2 = { 'userId': user._id, session: new Date().toISOString() + "-" + socialMedia.userId };
                        _context185.next = 24;
                        return regeneratorRuntime.awrap(LoginSessions.insert(_LSdata2));

                      case 24:
                        res = _context185.sent;
                        return _context185.abrupt('return', res.ops[0]);

                      case 26:
                        _context185.next = 28;
                        return regeneratorRuntime.awrap(Users.insert(args));

                      case 28:
                        res = _context185.sent;
                        _context185.t0 = prepare;
                        _context185.next = 32;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[1] }));

                      case 32:
                        _context185.t1 = _context185.sent;
                        user = (0, _context185.t0)(_context185.t1);
                        LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + user.userId };
                        _context185.next = 37;
                        return regeneratorRuntime.awrap(LoginSessions.insert(LSdata));

                      case 37:
                        res = _context185.sent;
                        return _context185.abrupt('return', res.ops[0]);

                      case 39:
                      case 'end':
                        return _context185.stop();
                    }
                  }
                }, null, undefined);
              },

              loginWithGoogle: function loginWithGoogle(root, args, context, info) {
                var socialMedia, _LSdata3, _res3, user, data, _LSdata4, res, LSdata;

                return regeneratorRuntime.async(function loginWithGoogle$(_context186) {
                  while (1) {
                    switch (_context186.prev = _context186.next) {
                      case 0:
                        _context186.next = 2;
                        return regeneratorRuntime.awrap(UserSocialMedias.findOne({ socialMediaName: "Google", socialMediaId: args.gid }));

                      case 2:
                        socialMedia = _context186.sent;

                        if (!socialMedia) {
                          _context186.next = 9;
                          break;
                        }

                        _LSdata3 = { 'userId': socialMedia.userId, session: new Date().toISOString() + "-" + socialMedia.userId };
                        _context186.next = 7;
                        return regeneratorRuntime.awrap(LoginSessions.insert(_LSdata3));

                      case 7:
                        _res3 = _context186.sent;
                        return _context186.abrupt('return', _res3.ops[0]);

                      case 9:
                        _context186.next = 11;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email }));

                      case 11:
                        user = _context186.sent;

                        if (!user) {
                          _context186.next = 26;
                          break;
                        }

                        user = prepare(user);
                        data = {};

                        data.userId = user._id;
                        data.socialMediaName = "Google";
                        data.socialMediaId = args.gid;
                        _context186.next = 20;
                        return regeneratorRuntime.awrap(UserSocialMedias.insert(data));

                      case 20:
                        socialMedia = _context186.sent;
                        _LSdata4 = { 'userId': user._id, session: new Date().toISOString() + "-" + socialMedia.userId };
                        _context186.next = 24;
                        return regeneratorRuntime.awrap(LoginSessions.insert(_LSdata4));

                      case 24:
                        res = _context186.sent;
                        return _context186.abrupt('return', res.ops[0]);

                      case 26:
                        _context186.next = 28;
                        return regeneratorRuntime.awrap(Users.insert(args));

                      case 28:
                        res = _context186.sent;
                        _context186.t0 = prepare;
                        _context186.next = 32;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[1] }));

                      case 32:
                        _context186.t1 = _context186.sent;
                        user = (0, _context186.t0)(_context186.t1);
                        LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + user.userId };
                        _context186.next = 37;
                        return regeneratorRuntime.awrap(LoginSessions.insert(LSdata));

                      case 37:
                        res = _context186.sent;
                        return _context186.abrupt('return', res.ops[0]);

                      case 39:
                      case 'end':
                        return _context186.stop();
                    }
                  }
                }, null, undefined);
              },

              signUpLinkedIN: function signUpLinkedIN(root, args, context, info) {
                var socialMedia, _LSdata5, _res4, user, data, _LSdata6, res, LSdata;

                return regeneratorRuntime.async(function signUpLinkedIN$(_context187) {
                  while (1) {
                    switch (_context187.prev = _context187.next) {
                      case 0:
                        _context187.next = 2;
                        return regeneratorRuntime.awrap(UserSocialMedias.findOne({ socialMediaName: "LinkedIn", socialMediaId: args.likedInId }));

                      case 2:
                        socialMedia = _context187.sent;

                        if (!socialMedia) {
                          _context187.next = 9;
                          break;
                        }

                        _LSdata5 = { 'userId': socialMedia.userId, session: new Date().toISOString() + "-" + socialMedia.userId };
                        _context187.next = 7;
                        return regeneratorRuntime.awrap(LoginSessions.insert(_LSdata5));

                      case 7:
                        _res4 = _context187.sent;
                        return _context187.abrupt('return', _res4.ops[0]);

                      case 9:
                        _context187.next = 11;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email }));

                      case 11:
                        user = _context187.sent;

                        if (!user) {
                          _context187.next = 26;
                          break;
                        }

                        user = prepare(user);
                        data = {};

                        data.userId = user._id;
                        data.socialMediaName = "LinkedIn";
                        data.socialMediaId = args.likedInId;
                        _context187.next = 20;
                        return regeneratorRuntime.awrap(UserSocialMedias.insert(data));

                      case 20:
                        socialMedia = _context187.sent;
                        _LSdata6 = { 'userId': user._id, session: new Date().toISOString() + "-" + socialMedia.userId };
                        _context187.next = 24;
                        return regeneratorRuntime.awrap(LoginSessions.insert(_LSdata6));

                      case 24:
                        res = _context187.sent;
                        return _context187.abrupt('return', res.ops[0]);

                      case 26:
                        _context187.next = 28;
                        return regeneratorRuntime.awrap(Users.insert(args));

                      case 28:
                        res = _context187.sent;
                        _context187.t0 = prepare;
                        _context187.next = 32;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[1] }));

                      case 32:
                        _context187.t1 = _context187.sent;
                        user = (0, _context187.t0)(_context187.t1);
                        LSdata = { 'userId': user._id, session: new Date().toISOString() + "-" + user.userId };
                        _context187.next = 37;
                        return regeneratorRuntime.awrap(LoginSessions.insert(LSdata));

                      case 37:
                        res = _context187.sent;
                        return _context187.abrupt('return', res.ops[0]);

                      case 39:
                      case 'end':
                        return _context187.stop();
                    }
                  }
                }, null, undefined);
              },

              createUserAccountSetting: function createUserAccountSetting(root, args) {
                var id, res, _res5, accId;

                return regeneratorRuntime.async(function createUserAccountSetting$(_context188) {
                  while (1) {
                    switch (_context188.prev = _context188.next) {
                      case 0:
                        _context188.next = 2;
                        return regeneratorRuntime.awrap(UserAccountSettings.findOne({ "userId": args.userId }));

                      case 2:
                        id = _context188.sent;

                        if (!id) {
                          _context188.next = 14;
                          break;
                        }

                        id.smsNotification = args.smsNotification;
                        id.generalNotification = args.generalNotification;
                        id.reservationNotification = args.reservationNotification;
                        id.accountNotification = args.accountNotification;
                        _context188.next = 10;
                        return regeneratorRuntime.awrap(UserAccountSettings.update({ "userId": args.userId }, id));

                      case 10:
                        res = _context188.sent;
                        return _context188.abrupt('return', { "message": "Set the Notification", "code": "200" });

                      case 14:
                        _context188.next = 16;
                        return regeneratorRuntime.awrap(UserAccountSettings.insert(args));

                      case 16:
                        _res5 = _context188.sent;
                        _context188.t0 = prepare;
                        _context188.next = 20;
                        return regeneratorRuntime.awrap(UserAccountSettings.findOne({ _id: _res5.insertedIds[1] }));

                      case 20:
                        _context188.t1 = _context188.sent;
                        accId = (0, _context188.t0)(_context188.t1);
                        return _context188.abrupt('return', { "message": "Set the Notification ", "code": "200" });

                      case 23:
                      case 'end':
                        return _context188.stop();
                    }
                  }
                }, null, undefined);
              },

              createLoginSession: function createLoginSession(root, args, context, info) {
                var res;
                return regeneratorRuntime.async(function createLoginSession$(_context189) {
                  while (1) {
                    switch (_context189.prev = _context189.next) {
                      case 0:
                        _context189.next = 2;
                        return regeneratorRuntime.awrap(LoginSessions.insert(args));

                      case 2:
                        res = _context189.sent;
                        _context189.t0 = prepare;
                        _context189.next = 6;
                        return regeneratorRuntime.awrap(LoginSessions.findOne({ _id: res.insertedIds[1] }));

                      case 6:
                        _context189.t1 = _context189.sent;
                        return _context189.abrupt('return', (0, _context189.t0)(_context189.t1));

                      case 8:
                      case 'end':
                        return _context189.stop();
                    }
                  }
                }, null, undefined);
              },
              createBudget: function createBudget(root, args, context, info) {
                var res;
                return regeneratorRuntime.async(function createBudget$(_context190) {
                  while (1) {
                    switch (_context190.prev = _context190.next) {
                      case 0:
                        _context190.next = 2;
                        return regeneratorRuntime.awrap(Budgets.insert(args));

                      case 2:
                        res = _context190.sent;
                        _context190.t0 = prepare;
                        _context190.next = 6;
                        return regeneratorRuntime.awrap(Budgets.findOne({ _id: res.insertedIds[1] }));

                      case 6:
                        _context190.t1 = _context190.sent;
                        return _context190.abrupt('return', (0, _context190.t0)(_context190.t1));

                      case 8:
                      case 'end':
                        return _context190.stop();
                    }
                  }
                }, null, undefined);
              },
              createCategory: function createCategory(root, args, context, info) {
                var res;
                return regeneratorRuntime.async(function createCategory$(_context191) {
                  while (1) {
                    switch (_context191.prev = _context191.next) {
                      case 0:
                        _context191.next = 2;
                        return regeneratorRuntime.awrap(Categories.insert(args));

                      case 2:
                        res = _context191.sent;
                        _context191.t0 = prepare;
                        _context191.next = 6;
                        return regeneratorRuntime.awrap(Categories.findOne({ _id: res.insertedIds[1] }));

                      case 6:
                        _context191.t1 = _context191.sent;
                        return _context191.abrupt('return', (0, _context191.t0)(_context191.t1));

                      case 8:
                      case 'end':
                        return _context191.stop();
                    }
                  }
                }, null, undefined);
              },
              createRequest: function createRequest(root, args, context, info) {
                var currentTime, res;
                return regeneratorRuntime.async(function createRequest$(_context192) {
                  while (1) {
                    switch (_context192.prev = _context192.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context192.next = 4;
                        return regeneratorRuntime.awrap(Requests.insert(args));

                      case 4:
                        res = _context192.sent;
                        _context192.t0 = prepare;
                        _context192.next = 8;
                        return regeneratorRuntime.awrap(Requests.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context192.t1 = _context192.sent;
                        return _context192.abrupt('return', (0, _context192.t0)(_context192.t1));

                      case 10:
                      case 'end':
                        return _context192.stop();
                    }
                  }
                }, null, undefined);
              },
              updateRequestCounter: function updateRequestCounter(root, args) {
                var id, res, _res6, viewId;

                return regeneratorRuntime.async(function updateRequestCounter$(_context193) {
                  while (1) {
                    switch (_context193.prev = _context193.next) {
                      case 0:
                        _context193.next = 2;
                        return regeneratorRuntime.awrap(RequestViews.findOne({ $and: [{ "requestId": args.requestId }, { "userId": args.userId }] }));

                      case 2:
                        id = _context193.sent;

                        if (!id) {
                          _context193.next = 11;
                          break;
                        }

                        id.view = id.view + 1;
                        _context193.next = 7;
                        return regeneratorRuntime.awrap(RequestViews.update({ $and: [{ "requestId": args.requestId }, { "userId": args.userId }] }, id));

                      case 7:
                        res = _context193.sent;
                        return _context193.abrupt('return', { "message": "RequestView  Updated", "code": "200" });

                      case 11:
                        args.view = 1;
                        _context193.next = 14;
                        return regeneratorRuntime.awrap(RequestViews.insert(args));

                      case 14:
                        _res6 = _context193.sent;
                        _context193.t0 = prepare;
                        _context193.next = 18;
                        return regeneratorRuntime.awrap(RequestViews.findOne({ _id: _res6.insertedIds[1] }));

                      case 18:
                        _context193.t1 = _context193.sent;
                        viewId = (0, _context193.t0)(_context193.t1);
                        return _context193.abrupt('return', { "message": "RequestView  Inserted", "code": "400" });

                      case 21:
                      case 'end':
                        return _context193.stop();
                    }
                  }
                }, null, undefined);
              },

              createRequestFlag: function createRequestFlag(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createRequestFlag$(_context194) {
                  while (1) {
                    switch (_context194.prev = _context194.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context194.next = 4;
                        return regeneratorRuntime.awrap(RequestFlags.insert(args));

                      case 4:
                        res = _context194.sent;
                        _context194.t0 = prepare;
                        _context194.next = 8;
                        return regeneratorRuntime.awrap(RequestFlags.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context194.t1 = _context194.sent;
                        return _context194.abrupt('return', (0, _context194.t0)(_context194.t1));

                      case 10:
                      case 'end':
                        return _context194.stop();
                    }
                  }
                }, null, undefined);
              },
              createComment: function createComment(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createComment$(_context195) {
                  while (1) {
                    switch (_context195.prev = _context195.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context195.next = 4;
                        return regeneratorRuntime.awrap(Comments.insert(args));

                      case 4:
                        res = _context195.sent;
                        _context195.t0 = prepare;
                        _context195.next = 8;
                        return regeneratorRuntime.awrap(Comments.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context195.t1 = _context195.sent;
                        return _context195.abrupt('return', (0, _context195.t0)(_context195.t1));

                      case 10:
                      case 'end':
                        return _context195.stop();
                    }
                  }
                }, null, undefined);
              },

              createMessage: function createMessage(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createMessage$(_context196) {
                  while (1) {
                    switch (_context196.prev = _context196.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context196.next = 4;
                        return regeneratorRuntime.awrap(Messages.insert(args));

                      case 4:
                        res = _context196.sent;
                        _context196.t0 = prepare;
                        _context196.next = 8;
                        return regeneratorRuntime.awrap(Messages.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context196.t1 = _context196.sent;
                        return _context196.abrupt('return', (0, _context196.t0)(_context196.t1));

                      case 10:
                      case 'end':
                        return _context196.stop();
                    }
                  }
                }, null, undefined);
              },

              createRequestTransaction: function createRequestTransaction(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createRequestTransaction$(_context197) {
                  while (1) {
                    switch (_context197.prev = _context197.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context197.next = 4;
                        return regeneratorRuntime.awrap(RequestTransactions.insert(args));

                      case 4:
                        res = _context197.sent;
                        _context197.t0 = prepare;
                        _context197.next = 8;
                        return regeneratorRuntime.awrap(RequestTransactions.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context197.t1 = _context197.sent;
                        return _context197.abrupt('return', (0, _context197.t0)(_context197.t1));

                      case 10:
                      case 'end':
                        return _context197.stop();
                    }
                  }
                }, null, undefined);
              },

              submitForApproval: function submitForApproval(root, args) {
                var spaces, res;
                return regeneratorRuntime.async(function submitForApproval$(_context198) {
                  while (1) {
                    switch (_context198.prev = _context198.next) {
                      case 0:
                        _context198.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spaces = _context198.sent;

                        if (!spaces) {
                          _context198.next = 11;
                          break;
                        }

                        spaces.status = "Pending";
                        _context198.next = 7;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, spaces));

                      case 7:
                        res = _context198.sent;
                        return _context198.abrupt('return', { "message": "Your space submitted for approval", "code": "200" });

                      case 11:
                        return _context198.abrupt('return', { "message": "Sorry try again", "code": "400" });

                      case 12:
                      case 'end':
                        return _context198.stop();
                    }
                  }
                }, null, undefined);
              },

              createPaymentMethod: function createPaymentMethod(root, args) {
                var res;
                return regeneratorRuntime.async(function createPaymentMethod$(_context199) {
                  while (1) {
                    switch (_context199.prev = _context199.next) {
                      case 0:
                        _context199.next = 2;
                        return regeneratorRuntime.awrap(PaymentMethods.insert(args));

                      case 2:
                        res = _context199.sent;
                        _context199.t0 = prepare;
                        _context199.next = 6;
                        return regeneratorRuntime.awrap(PaymentMethods.findOne({ _id: res.insertedIds[1] }));

                      case 6:
                        _context199.t1 = _context199.sent;
                        return _context199.abrupt('return', (0, _context199.t0)(_context199.t1));

                      case 8:
                      case 'end':
                        return _context199.stop();
                    }
                  }
                }, null, undefined);
              },

              doPayment: function doPayment(root, args) {
                return regeneratorRuntime.async(function doPayment$(_context200) {
                  while (1) {
                    switch (_context200.prev = _context200.next) {
                      case 0:
                        if (!args.token) {
                          _context200.next = 4;
                          break;
                        }

                        stripe.charges.create({
                          amount: args.amount,
                          currency: "usd",
                          description: args.reason,
                          source: args.token
                        }).then(function (charge) {
                          console.log(charge);
                        }).catch(function (err) {
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
                        _context200.next = 5;
                        break;

                      case 4:
                        return _context200.abrupt('return', { "message": "Please try code not found again", "code": "400" });

                      case 5:
                      case 'end':
                        return _context200.stop();
                    }
                  }
                }, null, undefined);
              },
              createFavourite: function createFavourite(root, args) {
                var filter, match, id, res, _res7;

                return regeneratorRuntime.async(function createFavourite$(_context201) {
                  while (1) {
                    switch (_context201.prev = _context201.next) {
                      case 0:
                        filter = {};

                        filter.userId = args.userId;
                        filter.spacseId = args.spacseId;

                        _context201.t0 = prepare;
                        _context201.next = 6;
                        return regeneratorRuntime.awrap(Favourites.findOne(filter));

                      case 6:
                        _context201.t1 = _context201.sent;
                        match = (0, _context201.t0)(_context201.t1);

                        console.log("match" + match);
                        console.log("userId" + match.userId);
                        console.log("spacseId" + match.spacseId);
                        id = match._id;

                        if (!id) {
                          _context201.next = 20;
                          break;
                        }

                        _context201.next = 15;
                        return regeneratorRuntime.awrap(Favourites.remove({ "_id": (0, _mongodb.ObjectId)(id) }));

                      case 15:
                        res = _context201.sent;
                        return _context201.abrupt('return', { "message": "Spacse is removed from your Favourites", "code": "400", "id": id });

                      case 20:
                        _context201.next = 22;
                        return regeneratorRuntime.awrap(Favourites.insert(args));

                      case 22:
                        _res7 = _context201.sent;
                        _context201.t2 = prepare;
                        _context201.next = 26;
                        return regeneratorRuntime.awrap(Favourites.findOne({ _id: _res7.insertedIds[1] }));

                      case 26:
                        _context201.t3 = _context201.sent;
                        id = (0, _context201.t2)(_context201.t3);
                        return _context201.abrupt('return', { "message": "Spacse is added to your Favourites", "code": "200", "id": id });

                      case 29:
                      case 'end':
                        return _context201.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpacseTour: function createSpacseTour(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createSpacseTour$(_context202) {
                  while (1) {
                    switch (_context202.prev = _context202.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context202.next = 4;
                        return regeneratorRuntime.awrap(SpacseTours.insert(args));

                      case 4:
                        res = _context202.sent;
                        _context202.t0 = prepare;
                        _context202.next = 8;
                        return regeneratorRuntime.awrap(SpacseTours.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context202.t1 = _context202.sent;
                        return _context202.abrupt('return', (0, _context202.t0)(_context202.t1));

                      case 10:
                      case 'end':
                        return _context202.stop();
                    }
                  }
                }, null, undefined);
              },

              createProperyCapacity: function createProperyCapacity(root, args) {
                var res;
                return regeneratorRuntime.async(function createProperyCapacity$(_context203) {
                  while (1) {
                    switch (_context203.prev = _context203.next) {
                      case 0:
                        _context203.next = 2;
                        return regeneratorRuntime.awrap(ProperyCapacities.insert(args));

                      case 2:
                        res = _context203.sent;
                        _context203.t0 = prepare;
                        _context203.next = 6;
                        return regeneratorRuntime.awrap(ProperyCapacities.findOne({ _id: res.insertedIds[1] }));

                      case 6:
                        _context203.t1 = _context203.sent;
                        return _context203.abrupt('return', (0, _context203.t0)(_context203.t1));

                      case 8:
                      case 'end':
                        return _context203.stop();
                    }
                  }
                }, null, undefined);
              },
              createAmenities: function createAmenities(root, args) {
                var res;
                return regeneratorRuntime.async(function createAmenities$(_context204) {
                  while (1) {
                    switch (_context204.prev = _context204.next) {
                      case 0:
                        _context204.next = 2;
                        return regeneratorRuntime.awrap(Amenities.insert(args));

                      case 2:
                        res = _context204.sent;
                        _context204.t0 = prepare;
                        _context204.next = 6;
                        return regeneratorRuntime.awrap(Amenities.findOne({ _id: res.insertedIds[1] }));

                      case 6:
                        _context204.t1 = _context204.sent;
                        return _context204.abrupt('return', (0, _context204.t0)(_context204.t1));

                      case 8:
                      case 'end':
                        return _context204.stop();
                    }
                  }
                }, null, undefined);
              },

              createSpacseAmenities: function createSpacseAmenities(root, args) {
                var i, data, res;
                return regeneratorRuntime.async(function createSpacseAmenities$(_context205) {
                  while (1) {
                    switch (_context205.prev = _context205.next) {
                      case 0:
                        i = 0;

                      case 1:
                        if (!(i < args.amenitiesIds.length)) {
                          _context205.next = 9;
                          break;
                        }

                        data = { "amenitiesId": args.amenitiesIds[i], "spacseId": args.spacseId };
                        _context205.next = 5;
                        return regeneratorRuntime.awrap(SpacseAmenities.insert(data));

                      case 5:
                        res = _context205.sent;

                      case 6:
                        i++;
                        _context205.next = 1;
                        break;

                      case 9:
                        _context205.next = 11;
                        return regeneratorRuntime.awrap(SpacseAmenities.find({ "spacseId": args.spacseId }).toArray());

                      case 11:
                        _context205.t0 = prepare;
                        return _context205.abrupt('return', _context205.sent.map(_context205.t0));

                      case 13:
                      case 'end':
                        return _context205.stop();
                    }
                  }
                }, null, undefined);
              },
              createUserPaymentInfo: function createUserPaymentInfo(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createUserPaymentInfo$(_context206) {
                  while (1) {
                    switch (_context206.prev = _context206.next) {
                      case 0:
                        _context206.next = 2;
                        return regeneratorRuntime.awrap(UserPaymentInfos.remove({ "spacseId": args.spacseId }));

                      case 2:
                        currentTime = Date.now();

                        args.createdAt = currentTime;

                        _context206.next = 6;
                        return regeneratorRuntime.awrap(UserPaymentInfos.insert(args));

                      case 6:
                        res = _context206.sent;
                        _context206.t0 = prepare;
                        _context206.next = 10;
                        return regeneratorRuntime.awrap(UserPaymentInfos.findOne({ _id: res.insertedIds[1] }));

                      case 10:
                        _context206.t1 = _context206.sent;
                        return _context206.abrupt('return', (0, _context206.t0)(_context206.t1));

                      case 12:
                      case 'end':
                        return _context206.stop();
                    }
                  }
                }, null, undefined);
              },

              createSpacse: function createSpacse(root, args) {
                var currentTime, spacseId, spaces, res, i, data, _res8, _res9;

                return regeneratorRuntime.async(function createSpacse$(_context207) {
                  while (1) {
                    switch (_context207.prev = _context207.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        spacseId = "";

                        spacseId = args._id;
                        delete args['_id'];

                        if (!spacseId) {
                          _context207.next = 14;
                          break;
                        }

                        _context207.next = 8;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 8:
                        spaces = _context207.sent;

                        for (key in args) {
                          spaces[key] = args[key];
                        }
                        _context207.next = 12;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(spacseId) }, spaces));

                      case 12:
                        _context207.next = 20;
                        break;

                      case 14:
                        currentTime = Date.now();

                        args.createdAt = currentTime;

                        _context207.next = 18;
                        return regeneratorRuntime.awrap(Spacses.insert(args));

                      case 18:
                        res = _context207.sent;

                        spacseId = res.insertedIds[1].toString();

                      case 20:
                        _context207.next = 22;
                        return regeneratorRuntime.awrap(SpacseAmenities.remove({ "spacseId": spacseId }));

                      case 22:
                        i = 0;

                      case 23:
                        if (!(i < args.aminities.length)) {
                          _context207.next = 31;
                          break;
                        }

                        data = { "amenitiesId": args.aminities[i], "spacseId": spacseId };
                        _context207.next = 27;
                        return regeneratorRuntime.awrap(SpacseAmenities.insert(data));

                      case 27:
                        _res8 = _context207.sent;

                      case 28:
                        i++;
                        _context207.next = 23;
                        break;

                      case 31:
                        _context207.next = 33;
                        return regeneratorRuntime.awrap(SpacseAvaibilities.remove({ "spacseId": spacseId }));

                      case 33:
                        i = 0;

                      case 34:
                        if (!(i < args.avaibilities.length)) {
                          _context207.next = 42;
                          break;
                        }

                        data = {
                          "days": args.avaibilities[i].days,
                          "startTime": args.avaibilities[i].startTime,
                          "endTime": args.avaibilities[i].endTime,
                          "spacseId": spacseId
                        };
                        _context207.next = 38;
                        return regeneratorRuntime.awrap(SpacseAvaibilities.insert(data));

                      case 38:
                        _res9 = _context207.sent;

                      case 39:
                        i++;
                        _context207.next = 34;
                        break;

                      case 42:
                        _context207.t0 = prepare;
                        _context207.next = 45;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(spacseId)));

                      case 45:
                        _context207.t1 = _context207.sent;
                        return _context207.abrupt('return', (0, _context207.t0)(_context207.t1));

                      case 47:
                      case 'end':
                        return _context207.stop();
                    }
                  }
                }, null, undefined);
              },

              updatePassword: function updatePassword(root, args) {
                var match, res;
                return regeneratorRuntime.async(function updatePassword$(_context208) {
                  while (1) {
                    switch (_context208.prev = _context208.next) {
                      case 0:
                        _context208.next = 2;
                        return regeneratorRuntime.awrap(Users.findOne({ $and: [{ "_id": { $eq: (0, _mongodb.ObjectId)(args._id) } }, { "password": { $eq: args.oldpassword } }] }));

                      case 2:
                        match = _context208.sent;

                        if (!match) {
                          _context208.next = 11;
                          break;
                        }

                        match.password = args.newpassword;
                        _context208.next = 7;
                        return regeneratorRuntime.awrap(Users.update({ _id: (0, _mongodb.ObjectId)(args._id) }, match));

                      case 7:
                        res = _context208.sent;
                        return _context208.abrupt('return', { "message": " Password Updated Successfully", "code": "200" });

                      case 11:
                        return _context208.abrupt('return', { "message": "Old password is not match", "code": "400" });

                      case 12:
                      case 'end':
                        return _context208.stop();
                    }
                  }
                }, null, undefined);
              },

              updateRequest: function updateRequest(root, args) {
                var id, res;
                return regeneratorRuntime.async(function updateRequest$(_context209) {
                  while (1) {
                    switch (_context209.prev = _context209.next) {
                      case 0:
                        _context209.next = 2;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(args._id)));

                      case 2:
                        id = _context209.sent;

                        if (!id) {
                          _context209.next = 11;
                          break;
                        }

                        args._id = (0, _mongodb.ObjectId)(args._id);
                        _context209.next = 7;
                        return regeneratorRuntime.awrap(Requests.update({ _id: (0, _mongodb.ObjectId)(args._id) }, args));

                      case 7:
                        res = _context209.sent;
                        return _context209.abrupt('return', { "message": "Request  Updated", "code": "200" });

                      case 11:
                        return _context209.abrupt('return', { "message": "Request  Not Updated", "code": "400" });

                      case 12:
                      case 'end':
                        return _context209.stop();
                    }
                  }
                }, null, undefined);
              },

              updatePrice: function updatePrice(root, args) {
                var i;
                return regeneratorRuntime.async(function updatePrice$(_context210) {
                  while (1) {
                    switch (_context210.prev = _context210.next) {
                      case 0:
                        i = 0;

                      case 1:
                        if (!(i < args.pricing.length)) {
                          _context210.next = 7;
                          break;
                        }

                        _context210.next = 4;
                        return regeneratorRuntime.awrap(PricingLayers.remove({ "spacseId": args.pricing[i].spacseId }));

                      case 4:
                        i++;
                        _context210.next = 1;
                        break;

                      case 7:
                        i = 0;

                      case 8:
                        if (!(i < args.pricing.length)) {
                          _context210.next = 14;
                          break;
                        }

                        _context210.next = 11;
                        return regeneratorRuntime.awrap(PricingLayers.insert(args.pricing[i]));

                      case 11:
                        i++;
                        _context210.next = 8;
                        break;

                      case 14:
                        return _context210.abrupt('return', { "message": "Register done", "code": "200" });

                      case 15:
                      case 'end':
                        return _context210.stop();
                    }
                  }
                }, null, undefined);
              },

              updateSecurityDeposit: function updateSecurityDeposit(root, args) {
                var space, res, _res10;

                return regeneratorRuntime.async(function updateSecurityDeposit$(_context211) {
                  while (1) {
                    switch (_context211.prev = _context211.next) {
                      case 0:
                        _context211.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne({ "_id": (0, _mongodb.ObjectId)(args.spacseId) }, { "securityDeposit": args.securityDeposit }));

                      case 2:
                        space = _context211.sent;

                        if (!space) {
                          _context211.next = 11;
                          break;
                        }

                        space.securityDeposit = args.securityDeposit;
                        _context211.next = 7;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, { $set: { "securityDeposit": args.securityDeposit } }));

                      case 7:
                        res = _context211.sent;
                        return _context211.abrupt('return', { "message": "Securitydeposit Updated", "code": "200" });

                      case 11:
                        _context211.next = 13;
                        return regeneratorRuntime.awrap(Spacses.insert(args));

                      case 13:
                        _res10 = _context211.sent;
                        return _context211.abrupt('return', { "message": "Securitydeposit added", "code": "200" });

                      case 15:
                      case 'end':
                        return _context211.stop();
                    }
                  }
                }, null, undefined);
              },

              updateAdditionalFees: function updateAdditionalFees(root, args) {
                var space, res, _res11;

                return regeneratorRuntime.async(function updateAdditionalFees$(_context212) {
                  while (1) {
                    switch (_context212.prev = _context212.next) {
                      case 0:
                        _context212.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne({ "_id": (0, _mongodb.ObjectId)(args.spacseId) }, { "additionalFees": args.additionalFees }));

                      case 2:
                        space = _context212.sent;

                        if (!space) {
                          _context212.next = 10;
                          break;
                        }

                        _context212.next = 6;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, { $set: { "additionalFees": args.additionalFees } }));

                      case 6:
                        res = _context212.sent;
                        return _context212.abrupt('return', { "message": "Additional Fees Updated", "code": "200" });

                      case 10:
                        _context212.next = 12;
                        return regeneratorRuntime.awrap(Spacses.insert(args));

                      case 12:
                        _res11 = _context212.sent;
                        return _context212.abrupt('return', { "message": "Additional Fees added", "code": "200" });

                      case 14:
                      case 'end':
                        return _context212.stop();
                    }
                  }
                }, null, undefined);
              },
              uploadImages: function uploadImages(root, args) {
                var spaces, res, i, data;
                return regeneratorRuntime.async(function uploadImages$(_context213) {
                  while (1) {
                    switch (_context213.prev = _context213.next) {
                      case 0:
                        _context213.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spaces = _context213.sent;

                        if (spaces) {
                          _context213.next = 5;
                          break;
                        }

                        throw new Error('Couldn\u2019t find space with id ');

                      case 5:
                        spaces.coverPictire = args.coverPic;
                        _context213.next = 8;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, spaces));

                      case 8:
                        res = _context213.sent;
                        _context213.next = 11;
                        return regeneratorRuntime.awrap(SpacsePhotoGalleries.remove({ "propertyId": args.spacseId }));

                      case 11:
                        i = 0;

                      case 12:
                        if (!(i < args.photoGellary.length)) {
                          _context213.next = 19;
                          break;
                        }

                        data = {
                          "propertyId": args.spacseId,
                          "imageUrl": args.photoGellary[i],
                          "status": "Active"
                        };
                        _context213.next = 16;
                        return regeneratorRuntime.awrap(SpacsePhotoGalleries.insert(data));

                      case 16:
                        i++;
                        _context213.next = 12;
                        break;

                      case 19:
                        return _context213.abrupt('return', { "message": "Images uploaded successfully", "code": "200" });

                      case 20:
                      case 'end':
                        return _context213.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep1: function createSpaceStep1(root, args) {
                var res, spaceId, spacse, i, data, categories;
                return regeneratorRuntime.async(function createSpaceStep1$(_context214) {
                  while (1) {
                    switch (_context214.prev = _context214.next) {
                      case 0:
                        res = {};
                        spaceId = "";

                        if (!args.spacseId) {
                          _context214.next = 48;
                          break;
                        }

                        _context214.next = 5;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 5:
                        spacse = _context214.sent;

                        if (!spacse) {
                          _context214.next = 28;
                          break;
                        }

                        spacse.categoryId = args.categoryId[0];
                        spacse.userId = args.userId;
                        spacse.status = "In Process";
                        _context214.next = 12;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, spacse));

                      case 12:
                        res = _context214.sent;
                        _context214.next = 15;
                        return regeneratorRuntime.awrap(SpaceCategories.remove({ "spacseId": args.spacseId }));

                      case 15:
                        i = 0;

                      case 16:
                        if (!(i < args.categoryId.length)) {
                          _context214.next = 25;
                          break;
                        }

                        data = {};

                        data.spacseId = args.spacseId;
                        data.categoryId = args.categoryId[i];
                        _context214.next = 22;
                        return regeneratorRuntime.awrap(SpaceCategories.insert(data));

                      case 22:
                        i++;
                        _context214.next = 16;
                        break;

                      case 25:
                        return _context214.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId });

                      case 28:
                        categories = args.categoryId;

                        args.categoryId = args.categoryId[0];
                        _context214.next = 32;
                        return regeneratorRuntime.awrap(Spacses.insert(args));

                      case 32:
                        res = _context214.sent;

                        spaceId = res.insertedIds[1];

                        i = 0;

                      case 35:
                        if (!(i < categories.length)) {
                          _context214.next = 45;
                          break;
                        }

                        data = {};

                        data.spacseId = spaceId;
                        data.status = "In Process";
                        data.categoryId = args.categoryId[i];
                        _context214.next = 42;
                        return regeneratorRuntime.awrap(SpaceCategories.insert(data));

                      case 42:
                        i++;
                        _context214.next = 35;
                        break;

                      case 45:
                        return _context214.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": spaceId });

                      case 46:
                        _context214.next = 56;
                        break;

                      case 48:
                        categories = args.categoryId;

                        args.categoryId = args.categoryId[0];
                        args.status = "In Process";
                        _context214.next = 53;
                        return regeneratorRuntime.awrap(Spacses.insert(args));

                      case 53:
                        res = _context214.sent;

                        spaceId = res.insertedIds[1];
                        return _context214.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": spaceId });

                      case 56:
                      case 'end':
                        return _context214.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep2: function createSpaceStep2(root, args) {
                var spacse;
                return regeneratorRuntime.async(function createSpaceStep2$(_context215) {
                  while (1) {
                    switch (_context215.prev = _context215.next) {
                      case 0:
                        _context215.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spacse = _context215.sent;

                        if (!spacse) {
                          _context215.next = 13;
                          break;
                        }

                        spacse.capacityId = args.capacityId;
                        spacse.numberOfRooms = args.numberOfRooms;
                        spacse.numberOfRestRooms = args.numberOfRestRooms;
                        spacse.squareFootArea = args.squareFootArea;
                        _context215.next = 10;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, spacse));

                      case 10:
                        return _context215.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId });

                      case 13:
                        return _context215.abrupt('return', { "message": "Spacse not found", "code": "400" });

                      case 14:
                      case 'end':
                        return _context215.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep3: function createSpaceStep3(root, args) {
                var spacse, i, data, res;
                return regeneratorRuntime.async(function createSpaceStep3$(_context216) {
                  while (1) {
                    switch (_context216.prev = _context216.next) {
                      case 0:
                        _context216.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spacse = _context216.sent;

                        if (!spacse) {
                          _context216.next = 18;
                          break;
                        }

                        _context216.next = 6;
                        return regeneratorRuntime.awrap(SpacseAmenities.remove({ "spacseId": args.spacseId }));

                      case 6:
                        i = 0;

                      case 7:
                        if (!(i < args.aminities.length)) {
                          _context216.next = 15;
                          break;
                        }

                        data = { "amenitiesId": args.aminities[i], "spacseId": args.spacseId };
                        _context216.next = 11;
                        return regeneratorRuntime.awrap(SpacseAmenities.insert(data));

                      case 11:
                        res = _context216.sent;

                      case 12:
                        i++;
                        _context216.next = 7;
                        break;

                      case 15:
                        return _context216.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId });

                      case 18:
                        return _context216.abrupt('return', { "message": "Spacse not found", "code": "400" });

                      case 19:
                      case 'end':
                        return _context216.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep4: function createSpaceStep4(root, args) {
                var spacse;
                return regeneratorRuntime.async(function createSpaceStep4$(_context217) {
                  while (1) {
                    switch (_context217.prev = _context217.next) {
                      case 0:
                        _context217.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spacse = _context217.sent;

                        if (!spacse) {
                          _context217.next = 15;
                          break;
                        }

                        spacse.state = args.state;
                        spacse.address = args.address;
                        spacse.city = args.city;
                        spacse.country = args.country;
                        spacse.latitude = args.latitude;
                        spacse.longitude = args.longitude;
                        _context217.next = 12;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, spacse));

                      case 12:
                        return _context217.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId });

                      case 15:
                        return _context217.abrupt('return', { "message": "Spacse not found", "code": "400" });

                      case 16:
                      case 'end':
                        return _context217.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep5: function createSpaceStep5(root, args) {
                var spacse, i, data, res;
                return regeneratorRuntime.async(function createSpaceStep5$(_context218) {
                  while (1) {
                    switch (_context218.prev = _context218.next) {
                      case 0:
                        _context218.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spacse = _context218.sent;

                        if (!spacse) {
                          _context218.next = 18;
                          break;
                        }

                        _context218.next = 6;
                        return regeneratorRuntime.awrap(SpacseAvaibilities.remove({ "spacseId": args.spacseId }));

                      case 6:
                        i = 0;

                      case 7:
                        if (!(i < args.avaibilities.length)) {
                          _context218.next = 15;
                          break;
                        }

                        data = {
                          "days": args.avaibilities[i].days,
                          "startTime": args.avaibilities[i].startTime,
                          "endTime": args.avaibilities[i].endTime,
                          "spacseId": args.spacseId
                        };
                        _context218.next = 11;
                        return regeneratorRuntime.awrap(SpacseAvaibilities.insert(data));

                      case 11:
                        res = _context218.sent;

                      case 12:
                        i++;
                        _context218.next = 7;
                        break;

                      case 15:
                        return _context218.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId });

                      case 18:
                        return _context218.abrupt('return', { "message": "Spacse not found", "code": "400" });

                      case 19:
                      case 'end':
                        return _context218.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep6: function createSpaceStep6(root, args) {
                var spacse;
                return regeneratorRuntime.async(function createSpaceStep6$(_context219) {
                  while (1) {
                    switch (_context219.prev = _context219.next) {
                      case 0:
                        _context219.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spacse = _context219.sent;

                        if (!spacse) {
                          _context219.next = 12;
                          break;
                        }

                        spacse.title = args.title;
                        spacse.subTitle = args.subTitle;
                        spacse.description = args.description;
                        _context219.next = 9;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, spacse));

                      case 9:
                        return _context219.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId });

                      case 12:
                        return _context219.abrupt('return', { "message": "Spacse not found", "code": "400" });

                      case 13:
                      case 'end':
                        return _context219.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep7: function createSpaceStep7(root, args) {
                return regeneratorRuntime.async(function createSpaceStep7$(_context220) {
                  while (1) {
                    switch (_context220.prev = _context220.next) {
                      case 0:
                        return _context220.abrupt('return', { "message": "Images uploaded successfully", "code": "200" });

                      case 1:
                      case 'end':
                        return _context220.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpaceStep8: function createSpaceStep8(root, args) {
                return regeneratorRuntime.async(function createSpaceStep8$(_context221) {
                  while (1) {
                    switch (_context221.prev = _context221.next) {
                      case 0:
                        return _context221.abrupt('return', { "message": "Images uploaded successfully", "code": "200" });

                      case 1:
                      case 'end':
                        return _context221.stop();
                    }
                  }
                }, null, undefined);
              },

              setPrivate: function setPrivate(root, args) {
                var spacse;
                return regeneratorRuntime.async(function setPrivate$(_context222) {
                  while (1) {
                    switch (_context222.prev = _context222.next) {
                      case 0:
                        _context222.next = 2;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseId)));

                      case 2:
                        spacse = _context222.sent;

                        if (!spacse) {
                          _context222.next = 10;
                          break;
                        }

                        spacse.isPrivate = args.isPrivate;
                        _context222.next = 7;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseId) }, spacse));

                      case 7:
                        return _context222.abrupt('return', { "message": "Temp Spacse Created", "code": "200", "id": args.spacseId });

                      case 10:
                        return _context222.abrupt('return', { "message": "Spacse not found", "code": "400" });

                      case 11:
                      case 'end':
                        return _context222.stop();
                    }
                  }
                }, null, undefined);
              },

              createContactToHost: function createContactToHost(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createContactToHost$(_context223) {
                  while (1) {
                    switch (_context223.prev = _context223.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context223.next = 4;
                        return regeneratorRuntime.awrap(ContactToHosts.insert(args));

                      case 4:
                        res = _context223.sent;
                        _context223.t0 = prepare;
                        _context223.next = 8;
                        return regeneratorRuntime.awrap(ContactToHosts.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context223.t1 = _context223.sent;
                        return _context223.abrupt('return', (0, _context223.t0)(_context223.t1));

                      case 10:
                      case 'end':
                        return _context223.stop();
                    }
                  }
                }, null, undefined);
              },
              createSpacseOffer: function createSpacseOffer(root, args) {
                var currentTime, res;
                return regeneratorRuntime.async(function createSpacseOffer$(_context224) {
                  while (1) {
                    switch (_context224.prev = _context224.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        _context224.next = 4;
                        return regeneratorRuntime.awrap(SpacseOffers.insert(args));

                      case 4:
                        res = _context224.sent;
                        _context224.t0 = prepare;
                        _context224.next = 8;
                        return regeneratorRuntime.awrap(SpacseOffers.findOne({ _id: res.insertedIds[1] }));

                      case 8:
                        _context224.t1 = _context224.sent;
                        return _context224.abrupt('return', (0, _context224.t0)(_context224.t1));

                      case 10:
                      case 'end':
                        return _context224.stop();
                    }
                  }
                }, null, undefined);
              },
              updateStatus: function updateStatus(root, args) {
                var i, spaces, res;
                return regeneratorRuntime.async(function updateStatus$(_context225) {
                  while (1) {
                    switch (_context225.prev = _context225.next) {
                      case 0:
                        if (!(args.status && args.spacseIds)) {
                          _context225.next = 17;
                          break;
                        }

                        i = 0;

                      case 2:
                        if (!(i < args.spacseIds.length)) {
                          _context225.next = 14;
                          break;
                        }

                        _context225.next = 5;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(args.spacseIds[i])));

                      case 5:
                        spaces = _context225.sent;

                        if (!spaces) {
                          _context225.next = 11;
                          break;
                        }

                        spaces.status = args.status;
                        _context225.next = 10;
                        return regeneratorRuntime.awrap(Spacses.update({ _id: (0, _mongodb.ObjectId)(args.spacseIds[i]) }, spaces));

                      case 10:
                        res = _context225.sent;

                      case 11:
                        i++;
                        _context225.next = 2;
                        break;

                      case 14:
                        return _context225.abrupt('return', { "message": "Status Updated", "code": "200" });

                      case 17:
                        return _context225.abrupt('return', { "message": "Spacse not found !!!", "code": "400" });

                      case 18:
                      case 'end':
                        return _context225.stop();
                    }
                  }
                }, null, undefined);
              },
              updateBookingStatus: function updateBookingStatus(root, args) {
                var booking, res, spaces, user, mailText, mailHeader, mailOptions;
                return regeneratorRuntime.async(function updateBookingStatus$(_context226) {
                  while (1) {
                    switch (_context226.prev = _context226.next) {
                      case 0:
                        _context226.next = 2;
                        return regeneratorRuntime.awrap(Bookings.findOne((0, _mongodb.ObjectId)(args.id)));

                      case 2:
                        booking = _context226.sent;

                        if (!booking) {
                          _context226.next = 18;
                          break;
                        }

                        booking.status = args.status;
                        _context226.next = 7;
                        return regeneratorRuntime.awrap(Bookings.update({ _id: (0, _mongodb.ObjectId)(args.id) }, booking));

                      case 7:
                        res = _context226.sent;
                        _context226.next = 10;
                        return regeneratorRuntime.awrap(Spacses.findOne((0, _mongodb.ObjectId)(booking.spaceId)));

                      case 10:
                        spaces = _context226.sent;
                        _context226.next = 13;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(booking.userId)));

                      case 13:
                        user = _context226.sent;

                        if (spaces && user) {
                          mailText = "";
                          mailHeader = "";

                          if (args.status == "Accepted") {
                            mailHeader = "Congratulations you booking request accepted!!!";
                            mailText = "Your booking request for " + spaces.title + " is accepted please complete your payment process!!!";
                          } else {
                            mailHeader = "Sorry you booking request is rejected!!!";
                            mailText = "Your booking request for " + spaces.title + " is accepted please complete your payment process!!!";
                          }
                          mailOptions = {
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

                        return _context226.abrupt('return', { "message": "Status Updated", "code": "200" });

                      case 18:
                        return _context226.abrupt('return', { "message": "Booking not found !!!", "code": "400" });

                      case 19:
                      case 'end':
                        return _context226.stop();
                    }
                  }
                }, null, undefined);
              },
              bookSpacse: function bookSpacse(root, args) {
                var currentTime;
                return regeneratorRuntime.async(function bookSpacse$(_context227) {
                  while (1) {
                    switch (_context227.prev = _context227.next) {
                      case 0:
                        currentTime = Date.now();

                        args.createdAt = currentTime;
                        args.updatedAt = currentTime;

                        stripe.charges.create({
                          amount: args.amount,
                          currency: "usd",
                          description: args.reason,
                          source: args.token
                        }).then(function (charge) {
                          console.log(charge);
                        }).catch(function (err) {
                          console.log(args);
                        });

                        /*  transactionId : String
                          status : String
                          paymentStatus: String */

                      case 4:
                      case 'end':
                        return _context227.stop();
                    }
                  }
                }, null, undefined);
              }

            }

          };
          schema = (0, _graphqlTools.makeExecutableSchema)({
            typeDefs: typeDefs,
            resolvers: resolvers
          });
          app = (0, _express2.default)();

          app.use(_bodyParser2.default.urlencoded({ extended: true }));
          app.use(_bodyParser2.default.json());

          app.use((0, _cors2.default)());

          storage = _multer2.default.diskStorage({

            destination: function destination(req, file, cb) {
              cb(null, 'uploads/');
            },
            filename: function filename(req, file, cb) {
              _crypto2.default.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + Date.now() + '.' + _mime2.default.extension(file.mimetype));
              });
            }
          });
          upload = (0, _multer2.default)({
            storage: storage
          });


          app.use('/uploads', _express2.default.static('uploads'));
          app.use('/graphql', upload.array('files'), _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: schema }));

          app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));

          app.post('/book-space', function (request, response) {
            var args = request.body;
            stripe.charges.create({
              amount: args.amount,
              currency: "usd",
              description: args.reason,
              source: args.token,
              capture: false
            }).then(function (charge) {
              console.log(charge.status);
              if (charge.status == "succeeded") {

                //  var currentTime = new Date().toISOString() 
                var currentTime = Date.now();
                args.createdAt = currentTime;
                args.transactionId = charge.id;
                args.status = "Pending";
                args.paymentStatus = "Authorized";
                args.paymentId = charge.id;
                args.amount = args.amount / 100;
                var res = Bookings.insert(args);

                Users.findOne((0, _mongodb.ObjectId)(args.spaceUserId), function (err, doc) {
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
                });

                Users.findOne((0, _mongodb.ObjectId)(args.userId), function (err, doc) {
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
                });

                // sendBookingMailToHost(args);
                // sendBookingMailToCustomer(args);

                response.send({ "code": 200, message: "Booking success." });
              } else {
                response.send({ "code": 400, message: "Fail Please try again" });
              }
            }).catch(function (err) {
              response.send({ "code": 400, message: err });
            });
          });

          app.post('/pay-for-booking', function (request, response) {
            var args = request.body;
            Bookings.findOne({ _id: (0, _mongodb.ObjectId)(args.id) }, function (err, booking) {
              if (err) {
                response.send({ "message": "Booking not found", "code": "400" });
              } else {
                if (args.status == "Cancel") {
                  response.send({ "message": "Your booking canceled ", "code": "400" });
                } else {
                  stripe.charges.create({
                    amount: args.amount / 100,
                    currency: "usd",
                    description: args.reason,
                    source: args.token,
                    capture: false
                  }).then(function (charge) {
                    if (charge.status == "succeeded") {
                      booking.paymentStatus = "Paid";
                      booking.paymentId = charge.id;
                      var res = Bookings.update({ _id: (0, _mongodb.ObjectId)(args.id) }, booking);
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

            Bookings.findOne({ _id: (0, _mongodb.ObjectId)(args.id) }, function (err, booking) {
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
                      var res = Bookings.update({ _id: (0, _mongodb.ObjectId)(args.id) }, booking);
                      response.send({ "message": "Problem with charging your debit / creadit card please pay now", "code": "404" });
                    } else {
                      if (charge.status == "succeeded") {
                        booking.paymentStatus = "Paid";
                        var _res12 = Bookings.update({ _id: (0, _mongodb.ObjectId)(args.id) }, booking);
                        response.send({ "message": "Thank you! your spacse is booked now.", "code": 200 });
                      } else {
                        booking.paymentStatus = "Rejected";
                        var _res13 = Bookings.update({ _id: (0, _mongodb.ObjectId)(args.id) }, booking);
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
            var args = request.body;
            RequestTransactions.findOne({ _id: (0, _mongodb.ObjectId)(args.requestTransactionId) }, function (err, doc) {
              if (err) {
                response.send({ "message": "Please try again", "code": "400" });
              } else {
                console.log(doc);
                if (args.token) {
                  stripe.charges.create({
                    amount: args.amount,
                    currency: "usd",
                    description: args.reason,
                    source: args.token
                  }).then(function (charge) {
                    if (charge.status == "succeeded") {
                      var transaction = {};
                      doc.status = "Paid";
                      RequestTransactions.update({ _id: (0, _mongodb.ObjectId)(args.requestTransactionId) }, doc);
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
              } else {
                res.send(req.file);
              }
            } catch (err) {
              res.send({ "status": "fail", "message": "Please upload image with 3:2 ratio" });
            }
          });

          app.listen(PORT, function () {
            console.log('Visit ' + URL + ':' + PORT);
          });
          _context228.next = 59;
          break;

        case 56:
          _context228.prev = 56;
          _context228.t0 = _context228['catch'](0);

          console.log(_context228.t0);

        case 59:
        case 'end':
          return _context228.stop();
      }
    }
  }, null, undefined, [[0, 56]]);
};