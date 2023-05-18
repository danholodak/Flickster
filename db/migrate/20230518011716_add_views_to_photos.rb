class AddViewsToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :photos, :views, :integer
  end
end
