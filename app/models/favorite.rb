class Favorite < ApplicationRecord
  validates :user_id, :photo_id, presence: true

  belongs_to :user,
  class_name: :User, 
  inverse_of: :favorites

  belongs_to :photo,
  class_name: :Photo,
  inverse_of: :favorites
end
