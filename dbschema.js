let db = {
    Student: [
        {
            email : 'johnson@email.com',
            age: 25,
            bio : 'I am jogn',
            comments : ['121232', '121312'],
            courses : 'computer science',
            creation_date: 'February 9, 2022 at 12:00:00 A< UTC +8',
            current_modules : ['CZ3002', 'CZ2007'],
            disliked_comments : ['123211', '12313213'],
            disliked_events : ['1232','123211'],
            disliked_threads: ['1232131'],
            joined_events: ['1232321'],
            gender: 'non-binary',
            interest : ['basketball'],
            liked_comments : ['123123'],
            liked_events : ['123123'],
            liked_threads : ['123123'],
            location: 'Tampines',
            name: 'johnson',
            profile_picture: 'https://no-img.com',
            reputation: 111,
            subscribed_subforum: ['CZ3007'],
            taken_modules : ['CZ1007'],
            threads : ['123123'],
            username : 'xiaojohnson',
            year_of_study : 3
        }
    ],
    
    Comments : [
        {
            dislikes: 15,
            likes: 15,
            is_deleted : false,
            is_edited : false,
            replies : ['1234'],
            text : 'sample text',
            threadid : '12321',
            time_created:'February 9, 2022 at 12:00:00 A< UTC +8',
            userid : '123213',
            is_reply = true
        }
    ],

    Events : [
        {
            attendees : ['123213'],
            dislikes : 123,
            likes : 1233,
            is_closed : false,
            is_deleted : false,
            is_edited : false,
            max_attendees : 5,
            num_comments : 12,
            subforum : 'CZ3007',
            text : 'hello lunch',
            time_created : 'February 9, 2022 at 12:00:00 A< UTC +8',
            time_end : 'February 9, 2022 at 12:00:00 A< UTC +8',
            title : 'lunch after lab',
            userid : '123213',
            last_comment_time : 'February 9, 2022 at 12:00:00 A< UTC +8'

        }
    ],

    Threads : [
        {
            dislikes : 123,
            likes : 1233,
            is_deleted : false,
            is_edited : false,
            num_comments : 12,
            subforum : 'CZ3007',
            text : 'hello lunch',
            time_created : 'February 9, 2022 at 12:00:00 A< UTC +8',
            time_last_edited : 'February 9, 2022 at 12:00:00 A< UTC +8',
            title : 'lunch after lab',
            userid : '123213',
            last_comment_time : 'February 9, 2022 at 12:00:00 A< UTC +8'

        }
    ],

    Courses : [
        {
            faculty : 'SCSE'
        }
    ],

    Modules : [
        {
            module_name : 'introduction tod atabase',
            num_of_AUs : 3
        }
    ],

    Subforums : [
        {
            description : 'course is d',
            events : ['12321', '1232132'],
            threads : ['12321', '1232132'],
            module : 'CZ2007',
            name : 'Introduction to dataabse',
            subcriber_count : 123
        }
    ]








}
    