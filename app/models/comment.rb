class Comment < ApplicationRecord
    validates :body, :author_id, :photo_id, presence: true

    belongs_to :author,
    class_name: :User

    belongs_to :photo


    
end