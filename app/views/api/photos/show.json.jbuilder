json.photo do
    json.extract! @photo, :id, :title, :user_id, :description, :created_at, :updated_at, :views, :showcase
    json.img @photo.img.attached? ? @photo.img.url : nil
    json.comments @photo.comment_ids
end