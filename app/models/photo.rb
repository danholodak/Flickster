# == Schema Information
#
# Table name: photos
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Photo < ApplicationRecord
    validates :title, :user_id, presence: true

    has_one_attached :img
    belongs_to :user

    has_many :comments,
    dependent: :destroy

    has_many :favorites,
    primary_key: :id,
    foreign_key: :photo_id,
    inverse_of: :photo,
    class_name: :Favorite,
    dependent: :destroy

    has_many :favoriters,
    through: :favorites,
    source: :user

    
end
