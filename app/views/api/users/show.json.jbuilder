
json.user do
  json.extract! @user,
    :id,
    :email,
    :first_name,
    :last_name,
    :display_name,
    :age,
    :current_city,
    :description,
    :website,
    :website_name,
    :occupation,
    :hometown,
    :current_city,
    :country,
    :airport,
    :facebook,
    :twitter,
    :instagram,
    :pinterest,
    :tumblr,
    :created_at,
    :updated_at

    json.profilePicUrl @user.prof_pic.attached? ? @user.prof_pic.url : nil
    json.headerPhotoUrl @user.header.attached? ? @user.header.url : nil
    json.photo_ids @user.photo_ids
    json.testimonials @user.testimonial_ids
    json.faves @user.favorite_photo_ids
    json.albums @user.album_ids
  end

