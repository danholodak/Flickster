# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# ApplicationRecord.transaction do
#     puts "Destroying tables..."
#     Photo.destroy_all
#     User.destroy_all

#     puts "Resetting primary keys..."
#     ApplicationRecord.connection.reset_pk_sequence!('users')

#     
# end

users = User.create([
    {email: 'demo@user.com',
    password: 'password12345',
    first_name: 'Demo',
    last_name: 'User',
    age: 25,
    occupation: 'model',
    hometown: 'Hometown, NY',
    website: "demousersrule.com",
    website_name: "My Awesome Site",
    current_city: "Big Apple, NY",
    airport: "OMG",
    description:"I'm not a real person, but I hope you enjoy my photos!"},
    {email: 'beth@email.com',
    password: 'password12345',
    first_name: 'Beth',
    last_name: 'C',
    age: 29,
    occupation: 'Photographer',
    hometown: 'Seattle, WA',
    website: "bethisbest.com",
    website_name: "The Beth Site",
    current_city: "Big Apple, NY",
    airport: "HAI",
    description:"These are some real photos by the real beth!"},
    {email: 'waterc@email.com',
    password: 'password12345',
    first_name: 'Water',
    last_name: 'Colors',
    age: 50,
    occupation: 'Painter',
    hometown: 'Oklahoma City, OK',
    website: "PaintShowcase.com",
    website_name: "Painting Showcase",
    current_city: "Austin, TX",
    airport: "LOL",
    description:"I like watercolors"},
    {email: 'dan@email.com',
    password: 'password12345',
    first_name: 'Dan',
    last_name: 'H',
    age: 29,
    occupation: 'Software Developer',
    hometown: 'Albany, NY',
    website: "DanHolodak.com.com",
    website_name: "Dan Holodak Site",
    current_city: "NYC, NY",
    airport: "THX",
    description:"My name is Dan Holodak. I'm a former photo/video professional making the switch to web and software development. I love finding creative solutions to challenging problems and I have a natural instinct for appealing visuals. I hope you enjoy Flickster and please take a look at my other projects as well!"},
    {email: 'flora@email.com',
    password: 'password12345',
    first_name: 'Flora',
    last_name: 'Fauna',
    age: 35,
    occupation: 'Wildlife Expert',
    hometown: 'Los Angeles, CA',
    current_city: "Ashville, NC",
    airport: "AKA",
    description:"I love taking photos of plants and Animals"}
    ])
    demo = User.find_by(email: 'demo@user.com')
    dan = User.find_by(email: 'dan@email.com')
    beth = User.find_by(email: 'beth@email.com')
    water = User.find_by(email: 'waterc@email.com')
    flora = User.find_by(email: 'flora@email.com')
    photo_info = {
        Demo:[
            ["Concerned Hawk", "Taken right after the hawk was asked 'Why did the chicken cross the road?'"],
            ["House in the Hills", " A solitary house in the scottish highlands"],
            ["Sunlit Shopping Mall", "A train-station-turned-shopping-mall in Dublin"],
            ["Red Bench", "A fine bench in London"],
            ["Leather Bag and Tiles", "A well-loved side bag left in vibrant surrounds"],
            ["Sunny in Chicago", "A tower lit up in the sun"],
            ["Cupcakes and Daisies", "Some delicious confections fresh out of the oven"],
            ["Temple Roof Detail", "Incredibly intricate painting, from the roof of a temple in S Korea"],
            ["Overgrown Storefront", "A storefront in Japan overgrown with blooming vines"],
            ["Breakfast in the Garden", "A peaceful garden breakfast in Paris"],
            ["Circles over Circles", "An interesting architectural detail in La Rochelle"]
        ],
        Beth:[
            ["Sculpture Student", "A sculpture in storage"],
            ["Sunset Drive", "A lens flare as the sun touches the crest of a hill on the road at sunset"],
            ["The View Up", "Looking straight up in an alleyway in Marrakesh"],
            ["Little Pink House", "A vibrant little corner of a well-kept house"],
            ["Gocar Go", "An ad for a tourism company in SF"],
            ["Desert Moon", "The white moon hangs over bright red Utah desert"],
            ["Lovers Encircled", "Two lovers in an embrace framed perfectly in a natural arch"],
            ["Iced Lagoon", "Blue glacial ice floating peacefully in a sunny lagoon in Alaska"],
            ["Balloon of Balloons", "A man traverses a market with colorful balloons in tow"],
            ["Cresting Cloud Wave", "A wave of cotton candy clouds drifts ovr the mountain ridge in Cape Town"],
            ["Flyers at Sunset", "Birds and a plane take off simultaneously in front of a vibrant sunset sky"]
        ],
        Dan:[
            ["castle window self portrait", "my reflection in a window of Himeji"],
            ["sheep on the hillside", "local residents on the road to the fairy pools of Skye"],
            ["dancers suspended", "a dance routine horizontally against a wall, high in the air in Berlin"],
            ["the smallest yawn", "sleepy newborn kit surrounded by daisies"],
            ["double dip", "two dancers trying out a move on a NYC subway platform"],
            ["buskers in sillhouette", "three musicians in Glacier national park"],
            ["sturdy bridge in the forest", "a bridge connects two parts of a path in Olympic national park"],
            ["duo on the dunes", "two fashionable visitors to White Sands national park"],
            ["rainbow road", "beth explores an art-covered bridge"],
            ["swingin sailors", "three musicians upon a boat in Amsterdam"],
            ["floating blue mountain", "storm clouds roll in over a gigantic iceburg in Alaska"]
        ],
        Water:[
            ["Pink Roses", "A quick study of a rose bush"],
            ["Cowch", "A cow rests at home among her art collection"],
            ["Amsterdam Moment", "A study of a section of canal in Amsterdam"],
            ["Music Corner"," the rare non-watercolor. line art of a corner with musical instruments"],
            ["New York Brutalism", "A study of a brutalist rooftop in Manhattan"],
            ["Buskers Under Bridge", "A study of three buskers performing under a bridge in Galway"],
            ["Centra Park Gem", "Study of a beautiful roof at the north end of Central Park"],
            ["Bistro Seating", "A woman glancing down at a menu at a Parisian cafe"],
            ["Overgrown Gazebo", "Quick study of a gazebo covered in moss and plants in the forest"],
            ["Green Courtyard", "A watercolor and pen ink study of a grassy courtyard"],
            ["Pontoon Boat", "A small study of a pontoon boat tied of in a calm bay"]
        ],
        Flora:[
            ["Mandarin Duck", "A beautiful little duck caught roaming the grounds of Schönbrunn Palace of Vienna"],
            ["Fusilier Fish", "Captured on a waterproof disposable at the Great Barrier Reef"],
            ["Felis Catus", "A housecat in her plush carpeted natural habitat"],
            ["Parisian Blossoms", "Pink cherry blossoms in the sun at Paris's Jardin des Plantes"],
            ["Calliope Hummingbird", "Saw this little friend near the conservatory in San Francisco's Golden Gate Park"],
            ["Ostrich Ferns", "These ones were past the fiddlehead harvesting time but others nearby were not!"],
            ["Fan-leaf Cinquefoil", "Yellow wildflowers seen on Hurricane Ridge of Olympic National Park"],
            ["Mercutio Orchid", "Seen here in a conservatory of Atlanta's botanical gardens"],
            ["African Buffalo", "Young buffalo play while an adult keeps watch"],
            ["Black Rhino", "Two rhinos in early morning in South Africa"],
            ["Bo-Kaap Stray", "A beautiful stray on the colorful streets of Cape Town"]
        ]
    }
    all_photos = []
    users.each do |user|
        #set 0.jpg as profile picture and set 1.jpg as header image
        profile_picture = File.open("app/assets/images/#{user.first_name}/0.jpg")
        user.prof_pic.attach(io: profile_picture, filename: "0.jpg")
        header_img = File.open("app/assets/images/#{user.first_name}/1.jpg")
        user.header.attach(io: header_img, filename: "1.jpg" )

        #create photos with 0-10.jpg and info from photo_info
        (0..10).each do |i|
            photo = Photo.create(title: photo_info[user.first_name][i][0], description: photo_info[user.first_name][i][1], user_id: user.id)
            photo_file = File.open("app/assets/images/#{user.first_name}/#{i}.jpg")
            photo.img.attach(io: photo_file, filename: "#{i}.jpg")
            all_photos << photo
        end

    end 


