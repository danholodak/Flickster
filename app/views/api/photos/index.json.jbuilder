@photos.each do |photo|
 json.set! photo.id do
    json.extract! photo, :id, :title, :user_id
    json.img photo.img.attached? ? photo.img.url : nil
 end
end