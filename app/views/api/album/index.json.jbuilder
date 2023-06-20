@albums.each do |album|
    json.set! album.id do
       json.extract! album, :id, :title, :user_id, :body, :banner_id, :created_at, :updated_at
       json.photos album.photo_ids
    end
   end