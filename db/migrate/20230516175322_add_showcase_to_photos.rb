class AddShowcaseToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :photos, :showcase, :boolean
  end
end
