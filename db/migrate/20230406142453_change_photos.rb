class ChangePhotos < ActiveRecord::Migration[7.0]
  def change
    add_index :photos, :title
  end
end
