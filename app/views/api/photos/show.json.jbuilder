json.photo do
    json.extract! @photo, :id, :title, :user_id, :created_at, :updated_at
    json.img @photo.img.attached? ? @photo.img.url : nil
end