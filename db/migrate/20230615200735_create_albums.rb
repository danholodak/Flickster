class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.references :user, null: false, foreign_key: true
      t.references :banner, null: false, foreign_key: {to_table: :photos}
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
