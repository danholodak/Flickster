class CreateAlbumEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :album_entries do |t|
      t.references :photo, null: false, foreign_key: true
      t.references :album, null: false, foreign_key: true

      t.timestamps
    end
  end
end
