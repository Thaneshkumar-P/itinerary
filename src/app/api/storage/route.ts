import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    const assignResponse = await fetch("http://localhost:9333/dir/assign", {
      method: "POST",
    });

    const assignData = await assignResponse.json();
    const { fid, url } = assignData;

    const uploadResponse = await fetch(`http://${url}/${fid}`, {
      method: "POST",
      body: file,
    });

    if (!uploadResponse.ok) {
      return NextResponse.json({ message: "File upload failed" }, { status: 500 });
    }

    return NextResponse.json({ fid }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const DELETE = async(req: Request) => {
  try {
    const formData = await req.json();

    console.log(formData)

    const deleteResponse = await fetch(`http://localhost:8080/${formData.fileId}`, {
      method: "DELETE",
    });


    if (!deleteResponse.ok) {
      return NextResponse.json({ message: "File deleted failed" }, { status: 500 });
    }

    return NextResponse.json({}, { status: 200 });

  }
  catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
