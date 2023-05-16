class Comment < ApplicationRecord
    validates :body, :author_id, :photo_id, presence: true

    belongs_to :author,

    
end