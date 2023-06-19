class Album < ApplicationRecord
  belongs_to :user

  has_one :banner,
  class_name: :Photo

  has_many :album_entries,
  class_name: :AlbumEntry,
  dependent: :destroy

  has_many :photos,
  through: :album_entries,
  source: :photo
end
