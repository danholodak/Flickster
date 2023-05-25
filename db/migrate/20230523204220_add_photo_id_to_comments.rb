class AddPhotoIdToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :photo_id, :bigint
    add_foreign_key :comments, :photos, column: :photo_id
  end
end
