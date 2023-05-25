class AddConstraintsAndIndexToPhotoId < ActiveRecord::Migration[7.0]
  def change
    change_column_null :comments, :photo_id, false
    add_index :comments, :photo_id
  end
end
