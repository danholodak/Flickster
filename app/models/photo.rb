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
end
